import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import LoadingData from "./LoadingData";

const Evolutions = ({
  allPokemonData,
  speciesInfo,
  selectedPokemon,
  setSelectedPokemon,
  setType,
  setActiveTab,
}) => {
  const selectedChainUrl = speciesInfo.evolution_chain.url;
  const [evolutionChainNames, setEvolutionChainNames] = useState([]);
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

  const extractEvolutionNames = (chain) => {
    const evolutionNames = [];

    while (chain) {
      const speciesName = chain.species.name;

      if (selectedPokemon?.name.includes("-galar")) {
        evolutionNames.push(`${speciesName}-galar`);
      } else if (selectedPokemon?.name.includes("-hisui")) {
        evolutionNames.push(`${speciesName}-hisui`);
      } else if (selectedPokemon?.name.includes("-alola")) {
        evolutionNames.push(`${speciesName}-alola`);
      } else {
        evolutionNames.push(speciesName);
      }

      if (chain.evolves_to.length > 0) {
        chain = chain.evolves_to[0];
      } else {
        chain = null;
      }
    }

    return evolutionNames;
  };

  const findPokemonByName = (name) => {
    return allPokemonData.find((pokemon) => pokemon.name === name);
  };

  const renderPokemonStage = (stage, name, img) => {
    const container = document.querySelector(".pokedex-modal__card");
    const types = [...stage.types].map((obj) => obj.type.name).sort();
    setType(types[0]);
    setSelectedPokemon(stage);
    setActiveTab("about");
    container.scrollTop = 0;
  };

  const renderEvolutionChain = () => {
    if (evolutionChainNames.length === 1) {
      return <li className="no-evolution-message">No evolutions</li>;
    }

    const isEevee =
      selectedPokemon.name === "eevee" ||
      selectedPokemon.name === "eevee-starter" ||
      selectedPokemon.name === "eevee-gmax";

    if (isEevee) {
      const specialEvolutions = [
        "vaporeon",
        "jolteon",
        "flareon",
        "espeon",
        "umbreon",
        "leafeon",
        "glaceon",
      ];

      const stages = specialEvolutions.map((name) => {
        const pokemon = findPokemonByName(name);
        const img =
          pokemon?.sprites.other["official-artwork"].front_default || "";

        return {
          stage: pokemon,
          name: "Stage 1",
          img: img,
        };
      });

      const handleClick = (stage) => {
        renderPokemonStage(stage, stage.name, stage.img);
      };

      return stages.map(({ stage, name, img }) => (
        <li
          key={stage.name}
          className="evolution-chain__pokemon-container"
          onClick={() => handleClick(stage)}
        >
          {stage && (
            <>
              <img
                src={img}
                alt={stage.name}
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

    const stages =
      selectedPokemon.name === "vaporeon" ||
      selectedPokemon.name === "jolteon" ||
      selectedPokemon.name === "flareon" ||
      selectedPokemon.name === "espeon" ||
      selectedPokemon.name === "umbreon" ||
      selectedPokemon.name === "leafeon" ||
      selectedPokemon.name === "glaceon"
        ? [
            {
              stage: findPokemonByName("eevee"),
              name: "Basic",
              img: findPokemonByName("eevee")?.sprites.other["official-artwork"]
                .front_default,
            },
          ]
        : evolutionChainNames.map((name, index) => {
            const pokemon = findPokemonByName(name);
            const img =
              pokemon?.sprites.other["official-artwork"].front_default || "";

            return {
              stage: pokemon,
              name: index === 0 ? "Basic" : `Stage ${index}`,
              img: img,
            };
          });

    const handleClick = (stage) => {
      renderPokemonStage(stage, stage.name, stage.img);
    };

    return stages.map(({ stage, name, img }) => {
      if (stage && stage.name) {
        return (
          <li
            key={stage.name}
            className="evolution-chain__pokemon-container"
            onClick={() => handleClick(stage)}
          >
            <img
              src={img}
              alt={stage.name}
              className="evolution-chain__pokemon-img"
            />
            <span className="evolution-chain__pokemon-name">{stage.name}</span>
            <span className="evolution-chain__pokemon-stage">{name}</span>
          </li>
        );
      } else {
        return null; // Skip rendering the <li> element if stage.name doesn't exist
      }
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {isLoading ? (
        <LoadingData />
      ) : (
        <ul className="evolutions">{renderEvolutionChain()}</ul>
      )}
    </motion.div>
  );
};

export default Evolutions;
