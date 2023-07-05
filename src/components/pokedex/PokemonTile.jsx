import { useState } from "react";

import PokemonTypeIcon from "./../shared/PokemonTypeIcon";

import typesData from "../../data/data";

const PokemonTile = ({ pokemonData, getSinglePokemonData }) => {
  const types = [...pokemonData.types].map((obj) => obj.type.name).sort();
  const [type, setType] = useState(types[0]);

  const typeColor = typesData.typeColors.find((colorObj) =>
    colorObj.hasOwnProperty(type)
  );

  const tileBackgroundColor = typeColor ? typeColor[type] : null;

  const pokemonImage =
    pokemonData.sprites.other["official-artwork"].front_default;
  const pokedexNumber =
    pokemonData.id < 10
      ? `#00${pokemonData.id}`
      : pokemonData.id < 100
      ? `#0${pokemonData.id}`
      : `#${pokemonData.id}`;
  const pokemonName = pokemonData.name;

  const typeIcons = types.map((type) => {
    const colorObj = typesData.typeColors.find((obj) => obj[type]);
    const iconColor = colorObj ? colorObj[type] : "";
    return (
      <PokemonTypeIcon
        key={type}
        classname="tile__type-icon"
        type={type}
        backgroundColor={iconColor}
        setType={setType}
      />
    );
  });

  return (
    <>
      {pokemonImage && (
        <div
          className="tile"
          style={{
            backgroundColor: tileBackgroundColor,
          }}
          onClick={(e) => getSinglePokemonData(e, pokemonData.id)}
        >
          <div className="tile__type-icon-container">{typeIcons}</div>

          <img src={pokemonImage} alt={pokemonName} className="tile-img" />

          <h2>
            <span className="tile__pokedex-number">{pokedexNumber}</span>{" "}
            <span className="tile__pokemon-name">{pokemonName}</span>
          </h2>
        </div>
      )}
    </>
  );
};

export default PokemonTile;
