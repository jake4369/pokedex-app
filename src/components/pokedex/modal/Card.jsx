import { useState } from "react";

import CardHeader from "./CardHeader";
import InfoContainer from "./InfoContainer";

import typesData from "./../../../data/data";

const Card = ({
  data,
  setPokemonModalOpen,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  let types;

  if (data !== null) {
    types = [...data.types].map((obj) => obj.type.name).sort();
  }

  const [type, setType] = useState(types[0]);

  const typeColor = typesData.typeColors.find((colorObj) =>
    colorObj.hasOwnProperty(type)
  );

  const backgroundColor = typeColor ? typeColor[type] : null;

  return (
    <div className="pokedex-modal__card" style={{ backgroundColor }}>
      <CardHeader
        data={data}
        setPokemonModalOpen={setPokemonModalOpen}
        setSelectedPokemon={setSelectedPokemon}
        types={types}
        type={type}
        setType={setType}
      />

      <InfoContainer data={data} selectedPokemon={selectedPokemon} />
    </div>
  );
};

export default Card;
