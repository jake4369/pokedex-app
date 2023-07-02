import typesData from "./../data/data";

const PokemonTypeIcon = ({
  classname,
  type,
  backgroundColor,
  setType,
  setPokemonName,
}) => {
  const images = typesData.typeIconsImages;

  const handleClick = () => {
    if (setType) {
      setType(type);
    }

    if (setPokemonName) {
      setPokemonName("");
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
