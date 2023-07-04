import { useState, useEffect } from "react";

import LoadingData from "./LoadingData";

const Evolutions = ({
  allPokemonData,
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
        setEvolutionChainNames(evolutionNames);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [selectedChainUrl]);

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

  console.log(evolutionDetails);

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
      ? allPokemonData.find(
          (pokemon) => pokemon.name === evolutionChainNames[0]
        )
      : null;

  const stageOnePokemon =
    evolutionChainNames.length > 1
      ? allPokemonData.find(
          (pokemon) => pokemon.name === evolutionChainNames[1]
        )
      : null;

  const stageTwoPokemon =
    evolutionChainNames.length > 2
      ? allPokemonData.find(
          (pokemon) => pokemon.name === evolutionChainNames[2]
        )
      : null;

  const renderEvolutionChain = () => {
    if (evolutionChainNames.length === 1) {
      return <li className="no-evolution-message">No evolutions</li>;
    }

    const stages = [
      {
        stage: basicStagePokemon,
        name: "Basic",
        img: basicStagePokemon?.sprites.other["official-artwork"].front_default,
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

  return <ul className="evolutions">{renderEvolutionChain()}</ul>;
};

export default Evolutions;
