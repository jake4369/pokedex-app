import { useState } from "react";

import { FaArrowLeft, FaRegHeart } from "react-icons/fa";

import PokemonTypeIcon from "./../../shared/PokemonTypeIcon";

import typesData from "./../../../data/data";

import pokeballImg from "./../../../assets/pokeball-white.png";

const CardHeader = ({
  data,
  setPokemonModalOpen,
  setSelectedPokemon,
  types,
  type,
  setType,
}) => {
  const images = typesData.typeIconsImages;
  let pokemonImage;
  let pokedexNumber;
  let pokemonName;

  if (data !== null) {
    pokemonImage = data.sprites.other["official-artwork"].front_default;
    pokedexNumber =
      data.id < 10
        ? `#00${data.id}`
        : data.id < 100
        ? `#0${data.id}`
        : `#${data.id}`;
    pokemonName = data.name;
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