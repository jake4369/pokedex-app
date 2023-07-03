import { useEffect, useState } from "react";

import About from "./About";

const InfoContainer = ({ data, selectedPokemon }) => {
  const [speciesInfo, setSpeciesInfo] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`)
      .then((res) => res.json())
      .then((data) => setSpeciesInfo(data))
      .catch((error) => console.log(error));
  }, [selectedPokemon]);

  const tabs = ["about", "stats", "evolutions", "moves"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
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
          data={data}
          selectedPokemon={selectedPokemon}
          speciesInfo={speciesInfo}
        />
      ) : null}
    </div>
  );
};

export default InfoContainer;
