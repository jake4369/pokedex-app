import typesData from "./../../data/data";

const PokemonTypeIcon = ({
  classname,
  type,
  backgroundColor,
  setType,
  setPokemonName,
  filterPokemon,
  setCurrentPage,
  setShowFilters,
  setShowPokemon,
  setActiveFilter,
}) => {
  const images = typesData.typeIconsImages;

  const handleClick = () => {
    if (setType) {
      setType(type);
    }

    if (setPokemonName) {
      setPokemonName("");
    }

    if (filterPokemon) {
      filterPokemon();
    }

    if (setCurrentPage) {
      setCurrentPage(1);
    }

    if (setShowFilters) {
      setShowFilters(false);
    }

    if (setShowPokemon) {
      setShowPokemon(true);
    }

    if (setActiveFilter) {
      setActiveFilter("");
    }
  };

  return (
    <div
      className={`type-icon ${classname} ${type}`}
      style={{ backgroundColor }}
      onClick={handleClick}
    >
      <img src={images[type]} alt={`${type} icon`} />
    </div>
  );
};

export default PokemonTypeIcon;
