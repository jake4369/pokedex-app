import PokemonTypeIcon from "./../shared/PokemonTypeIcon";

import typesData from "./../../data/data";

const TypeIconContainer = ({
  setSelectedType,
  setPokemonName,
  filterPokemon,
  setCurrentPage,
  setShowFilters,
  setShowPokemon,
}) => {
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
          filterPokemon={filterPokemon}
          setCurrentPage={setCurrentPage}
          setShowFilters={setShowFilters}
          setShowPokemon={setShowPokemon}
        />

        <p>{type}</p>
      </div>
    );
  });

  return (
    <header className="search-type__container">
      <h2>Click an icon to search by type</h2>
      <div className="pokedex-page__type-icon-container">{typeIcons}</div>
    </header>
  );
};

export default TypeIconContainer;
