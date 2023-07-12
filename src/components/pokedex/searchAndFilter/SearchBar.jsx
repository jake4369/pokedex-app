import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  pokemonName,
  setPokemonName,
  setSelectedType,
  setActiveFilter,
  setShowFilters,
  setShowPokemon,
}) => {
  const handleChange = (e) => {
    setPokemonName(e.target.value);
    setSelectedType("");
    setActiveFilter("");
    setShowFilters(false);
    setShowPokemon(true);
  };

  return (
    <form className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search by name..."
        value={pokemonName}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
