import PokemonTypeIcon from "./../shared/PokemonTypeIcon";

import typesData from "./../../data/data";

const TypeIconContainer = ({ setSelectedType, setPokemonName }) => {
  const typeIcons = typesData.types.map((type) => {
    const colorObj = typesData.typeColors.find((obj) => obj[type]);
    const backgroundColor = colorObj ? colorObj[type] : "";
    return (
      <div className="type-icon-container" key={type}>
        <PokemonTypeIcon
          classname="pokedex__type-icon"
          type={type}
          backgroundColor={backgroundColor}
          setType={setSelectedType}
          setPokemonName={setPokemonName}
        />

        <p>{type}</p>
      </div>
    );
  });

  return (
    <div>
      <h2>Click an icon to search by type</h2>
      <div className="pokedex-page__type-icon-container">{typeIcons}</div>
    </div>
  );
};

export default TypeIconContainer;
