import { useState, useEffect } from "react";

import LoadingData from "./LoadingData";

const Evolutions = ({
  initialPokemonData,
  speciesInfo,
  setSelectedPokemon,
  setType,
}) => {
  const selectedChainUrl = speciesInfo.evolution_chain.url;
  const [evolutionChainNames, setEvolutionChainNames] = useState([]);
  const [evolutionDetails, setEvolutionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await fetch(selectedChainUrl);
        const evolutionChainData = await response.json();
        const evolutionNames = extractEvolutionNames(evolutionChainData.chain);
        if (speciesInfo.name === "eevee") {
          setEvolutionChainNames([
            "vaporeon",
            "jolteon",
            "flareon",
            "espeon",
            "umbreon",
            "leafeon",
            "glaceon",
          ]);
        } else {
          setEvolutionChainNames(evolutionNames);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [selectedChainUrl, evolutionDetails, speciesInfo, evolutionChainNames]);

  console.log(evolutionChainNames);

  useEffect(() => {
    if (evolutionChainNames.length > 0) {
      fetch(selectedChainUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            if (speciesInfo.name === evolutionChainNames[0]) {
              setEvolutionDetails(
                data.chain.evolves_to[0].evolution_details[0]
              );
            } else if (speciesInfo.name === evolutionChainNames[1]) {
              console.log(
                data.chain.evolves_to[0].evolves_to[0].evolution_details[0]
              );
            }
          }
        });
    }
  }, [speciesInfo]);

  const extractEvolutionNames = (chain) => {
    const evolutionNames = [];

    while (chain) {
      const speciesName = chain.species.name;
      evolutionNames.push(speciesName);

      if (chain.evolves_to.length > 0) {
        chain = chain.evolves_to[0];
      } else {
        chain = null;
      }
    }

    return evolutionNames;
  };

  const basicStagePokemon =
    evolutionChainNames.length > 0
      ? initialPokemonData.find(
          (pokemon) => pokemon.name === evolutionChainNames[0]
        )
      : null;

  const stageOnePokemon =
    evolutionChainNames.length > 1
      ? initialPokemonData.find(
          (pokemon) => pokemon.name === evolutionChainNames[1]
        )
      : null;

  const stageTwoPokemon =
    evolutionChainNames.length > 2
      ? initialPokemonData.find(
          (pokemon) => pokemon.name === evolutionChainNames[2]
        )
      : null;

  const renderEvolutionChain = () => {
    if (evolutionChainNames.length === 1) {
      return <li className="no-evolution-message">No evolutions</li>;
    }

    if (speciesInfo.name === "eevee") {
      if (evolutionChainNames.length === 1) {
        return <li className="no-evolution-message">No evolutions</li>;
      }

      if (speciesInfo.name === "eevee") {
        const stages = evolutionChainNames.map((name) => {
          const pokemon = initialPokemonData.find(
            (pokemon) => pokemon.name === name
          );

          const img =
            pokemon?.sprites.other["official-artwork"].front_default || ""; // Provide a fallback image URL if it's missing
          return {
            stage: name,
            name: pokemon.name, // Extract the name property
            img: img,
          };
        });

        return stages.map(({ stage, name, img }) => (
          <li key={name} className="evolution-chain__pokemon-container">
            {stage && (
              <>
                <img
                  src={img}
                  alt={name}
                  className="evolution-chain__pokemon-img"
                />
                <span className="evolution-chain__pokemon-name">
                  {stage.name}
                </span>
                <span className="evolution-chain__pokemon-stage">{name}</span>
              </>
            )}
          </li>
        ));
      }
    }

    let stages;

    if (
      speciesInfo.name === "vaporeon" ||
      speciesInfo.name === "jolteon" ||
      speciesInfo.name === "flareon" ||
      speciesInfo.name === "espeon" ||
      speciesInfo.name === "umbreon" ||
      speciesInfo.name === "leafeon" ||
      speciesInfo.name === "glaceon"
    ) {
      stages = [
        {
          stage: basicStagePokemon,
          name: "Basic",
          img: basicStagePokemon?.sprites.other["official-artwork"]
            .front_default,
        },
      ];
    } else {
      stages = [
        {
          stage: basicStagePokemon,
          name: "Basic",
          img: basicStagePokemon?.sprites.other["official-artwork"]
            .front_default,
        },
        {
          stage: stageOnePokemon,
          name: "Stage 1",
          img: stageOnePokemon?.sprites.other["official-artwork"].front_default,
        },
        {
          stage: stageTwoPokemon,
          name: "Stage 2",
          img: stageTwoPokemon?.sprites.other["official-artwork"].front_default,
        },
      ];
    }

    const handleClick = (stage) => {
      const types = [...stage.types].map((obj) => obj.type.name).sort();
      setType(types[0]);
      setSelectedPokemon(stage);
    };

    return stages.map(({ stage, name, img }) => (
      <li
        key={name}
        className="evolution-chain__pokemon-container"
        onClick={() => handleClick(stage)}
      >
        {stage ? (
          <>
            <img
              src={img}
              alt={name}
              className="evolution-chain__pokemon-img"
            />
            <span className="evolution-chain__pokemon-name">{stage.name}</span>
            <span className="evolution-chain__pokemon-stage">{name}</span>
          </>
        ) : null}
      </li>
    ));
  };

  if (isLoading) {
    return <LoadingData />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ul className="evolutions fade-in-fwd">{renderEvolutionChain()}</ul>;
};

export default Evolutions;
