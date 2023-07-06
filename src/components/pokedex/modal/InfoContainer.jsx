import { useEffect, useState } from "react";

import About from "./About";
import BaseStats from "./BaseStats";
import Evolutions from "./Evolutions";

const InfoContainer = ({
  allPokemonData,
  selectedPokemon,
  setSelectedPokemon,
  setType,
}) => {
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [speciesInfoLoaded, setSpeciesInfoLoaded] = useState(false);

  useEffect(() => {
    setSpeciesInfoLoaded(false);
    fetch(selectedPokemon.species.url)
      .then((res) => res.json())
      .then((data) => {
        setSpeciesInfo(data);
        setSpeciesInfoLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [selectedPokemon]);

  const tabs = ["about", "stats", "evolutions", "moves"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    const container = document.querySelector(".pokedex-modal__card");
    container.scrollTop = container.scrollHeight;
    setActiveTab(tab);
  };

  const tabBtns = tabs.map((tab) => {
    return (
      <button
        key={tab}
        className={`model-card__info-tab-btn ${
          activeTab === tab ? "active" : ""
        }`}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </button>
    );
  });

  return (
    <div className="model-card__info-container">
      <div className="model-card__info-tabs">{tabBtns}</div>

      {activeTab === "about" ? (
        <About
          selectedPokemon={selectedPokemon}
          speciesInfo={speciesInfo}
          speciesInfoLoaded={speciesInfoLoaded}
        />
      ) : activeTab === "stats" ? (
        <BaseStats selectedPokemon={selectedPokemon} />
      ) : activeTab === "evolutions" ? (
        <Evolutions
          allPokemonData={allPokemonData}
          speciesInfo={speciesInfo}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          setType={setType}
          setActiveTab={setActiveTab}
        />
      ) : null}
    </div>
  );
};

// import { motion, AnimatePresence } from "framer-motion";

// const InfoContainer = (
//   allPokemonData,
//   selectedPokemon,
//   setSelectedPokemon,
//   setType
// ) => {
//   const [speciesInfo, setSpeciesInfo] = useState(null);
//   const tabs = ["about", "stats", "evolutions", "moves"];
//   const [speciesInfoLoaded, setSpeciesInfoLoaded] = useState(false);
//   const [activeTab, setActiveTab] = useState(tabs[0]);

//   useEffect(() => {
//     setSpeciesInfoLoaded(false);
//     fetch(selectedPokemon.species?.url)
//       .then((res) => res.json())
//       .then((data) => {
//         setSpeciesInfo(data);
//         setSpeciesInfoLoaded(true);
//       })
//       .catch((error) => console.log(error));
//   }, [selectedPokemon]);

//   const handleTabClick = (tab) => {
//     const container = document.querySelector(".pokedex-modal__card");
//     container.scrollTop = container.scrollHeight;
//     setActiveTab(tab);
//   };

//   const tabBtns = tabs.map((tab) => {
//     return (
//       <motion.button
//         key={tab}
//         className={`model-card__info-tab-btn ${
//           activeTab === tab ? "active" : ""
//         }`}
//         onClick={() => handleTabClick(tab)}
//       >
//         {tab}
//       </motion.button>
//     );
//   });

//   return (
//     <motion.div
//       className="model-card__info-container"
//       initial={{ y: 10, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       exit={{ y: -10, opacity: 0 }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="model-card__info-tabs">{tabBtns}</div>

//       {activeTab === "about" ? (
//         <About
//           selectedPokemon={selectedPokemon}
//           speciesInfo={speciesInfo}
//           speciesInfoLoaded={speciesInfoLoaded}
//         />
//       ) : activeTab === "stats" ? (
//         <BaseStats selectedPokemon={selectedPokemon} />
//       ) : activeTab === "evolutions" ? (
//         <Evolutions
//           allPokemonData={allPokemonData}
//           speciesInfo={speciesInfo}
//           selectedPokemon={selectedPokemon}
//           setSelectedPokemon={setSelectedPokemon}
//           setType={setType}
//           setActiveTab={setActiveTab}
//         />
//       ) : null}
//     </motion.div>
//   );
// };

export default InfoContainer;
