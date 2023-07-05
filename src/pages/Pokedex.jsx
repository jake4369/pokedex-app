import { useState, useEffect } from "react";

import LoadingSpinner from "./../components/shared/LoadingSpinner";
import SearchBar from "./../components/pokedex/SearchBar";
import TypeIconContainer from "./../components/pokedex/TypeIconContainer";
import TileSection from "./../components/pokedex/TileSection";
import Modal from "../components/pokedex/modal/Modal";

const Pokedex = ({ allPokemonData, loading }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokedexModalOpen, setPokemonModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    filterPokemon();
  }, [pokemonName, selectedType]);

  const filterPokemon = () => {
    if (pokemonName !== "" && selectedType === "") {
      const filteredByName = [...allPokemonData].filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
      );

      setFilteredPokemon(filteredByName);
    } else if (selectedType !== "" && pokemonName === "") {
      const filteredByType = [...allPokemonData].filter((obj) => {
        return (
          obj.types[0].type.name === selectedType ||
          (obj.types[1] && obj.types[1].type.name === selectedType)
        );
      });
      setFilteredPokemon(filteredByType);
    }
  };

  const getSinglePokemonData = (e, id) => {
    const typeIconContainer = e.target.closest(".tile__type-icon-container");
    const typeIcon = e.target.closest(".type-icon");

    if (!typeIconContainer && !typeIcon) {
      const pokemon = allPokemonData.find((pokemon) => pokemon.id === id);
      setSelectedPokemon(pokemon);
      setPokemonModalOpen(true);
    }
  };

  return (
    <div className="pokedex-page">
      {loading && !allPokemonData.length ? ( // Check if loading is true and no pokemonData is available
        <LoadingSpinner />
      ) : (
        <>
          <SearchBar
            setPokemonName={setPokemonName}
            setSelectedType={setSelectedType}
            filterPokemon={filterPokemon}
            setFilteredPokemon={setFilteredPokemon}
          />

          <TypeIconContainer
            setPokemonName={setPokemonName}
            setSelectedType={setSelectedType}
            filterPokemon={filterPokemon}
            setCurrentPage={setCurrentPage}
          />

          {loading ? ( // Render the loading spinner only for the TileSection component
            <LoadingSpinner />
          ) : (
            <TileSection
              loading={loading}
              allPokemonData={allPokemonData}
              getSinglePokemonData={getSinglePokemonData}
              filteredPokemon={filteredPokemon}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}

          {selectedPokemon !== null && (
            <Modal
              pokedexModalOpen={pokedexModalOpen}
              setPokemonModalOpen={setPokemonModalOpen}
              allPokemonData={allPokemonData}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Pokedex;
