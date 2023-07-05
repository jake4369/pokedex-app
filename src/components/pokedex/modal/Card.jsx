import { useState } from "react";

import CardHeader from "./CardHeader";
import InfoContainer from "./InfoContainer";

import typesData from "./../../../data/data";

const Card = ({
  setPokemonModalOpen,
  allPokemonData,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  console.log(selectedPokemon);
  let types;

  if (selectedPokemon !== null) {
    types = [...selectedPokemon.types].map((obj) => obj.type.name).sort();
  }

  const [type, setType] = useState(types[0]);

  const typeColor = typesData.typeColors.find((colorObj) =>
    colorObj.hasOwnProperty(type)
  );

  const backgroundColor = typeColor ? typeColor[type] : null;

  return (
    <div className="pokedex-modal__card" style={{ backgroundColor }}>
      <CardHeader
        selectedPokemon={selectedPokemon}
        setPokemonModalOpen={setPokemonModalOpen}
        setSelectedPokemon={setSelectedPokemon}
        types={types}
        type={type}
        setType={setType}
      />

      <InfoContainer
        allPokemonData={allPokemonData}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        setType={setType}
      />
    </div>
  );
};

export default Card;
