import { FaArrowLeft, FaRegHeart } from "react-icons/fa";

import PokemonTypeIcon from "./../../shared/PokemonTypeIcon";

import typesData from "./../../../data/data";

import pokeballImg from "./../../../assets/pokeball-white.png";

const CardHeader = ({
  setPokemonModalOpen,
  selectedPokemon,
  setSelectedPokemon,
  types,
  type,
  setType,
}) => {
  const images = typesData.typeIconsImages;
  let pokemonImage;
  let pokedexNumber;
  let pokemonName;

  if (selectedPokemon !== null) {
    pokemonImage =
      selectedPokemon.sprites.other["official-artwork"].front_default;
    pokedexNumber =
      selectedPokemon.id < 10
        ? `#00${selectedPokemon.id}`
        : selectedPokemon.id < 100
        ? `#0${selectedPokemon.id}`
        : `#${selectedPokemon.id}`;
    pokemonName = selectedPokemon.name;
  }

  const typeColor = typesData.typeColors.find((colorObj) =>
    colorObj.hasOwnProperty(type)
  );

  const backgroundColor = typeColor ? typeColor[type] : null;

  const typeBadges = types.map((type) => {
    const colorObj = typesData.typeColors.find((obj) => obj[type]);
    const color = colorObj ? colorObj[type] : "";
    return (
      <PokemonTypeIcon
        key={type}
        classname="pokedex-modal__card-type-icon"
        type={type}
        backgroundColor={color}
        setType={setType}
      />
    );
  });

  const handleCloseButtonClick = () => {
    setPokemonModalOpen(false);
    setSelectedPokemon(null);
    document.body.style.overflowY = "auto";
  };

  return (
    <header
      className="pokedex-modal__card-header"
      style={{
        backgroundColor,
      }}
    >
      <div className="pokedex-modal__button-container">
        <button className="close-modal-btn" onClick={handleCloseButtonClick}>
          <FaArrowLeft className="close-modal-icon" />
        </button>
        <button className="pokedex-modal__favorite-btn">
          <FaRegHeart />
        </button>
      </div>

      <div className="pokedex-modal__name-container">
        <span className="pokedex-modal__name">{pokemonName}</span>{" "}
        <span className="pokedex-modal__id">{pokedexNumber}</span>
      </div>
      <img src={pokemonImage} alt="" className="pokedex-modal__main-img" />
      <div className="pokedex-modal__card-icons">{typeBadges}</div>

      <img src={pokeballImg} alt="" className="pokedex-modal__pokeball-img" />
      <img src={images[type]} alt="" className="pokedex-modal__type-img" />
    </header>
  );
};

export default CardHeader;
