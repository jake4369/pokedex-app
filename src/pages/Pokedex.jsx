import { useState, useEffect } from "react";

import LoadingSpinner from "./../components/shared/LoadingSpinner";
import TileSection from "./../components/pokedex/TileSection";
import PokedexInstructions from "../components/pokedex/PokedexInstructions";
import Modal from "../components/pokedex/modal/Modal";
import SearchAndFilter from "../components/pokedex/searchAndFilter/SearchAndFilter";

const Pokedex = ({ allPokemonData, loading }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [showPokemon, setShowPokemon] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [pokemonName, setPokemonName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokedexModalOpen, setPokemonModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    filterPokemon();
  }, [pokemonName, selectedType]);

  const filterPokemon = () => {
    if (pokemonName !== "" && selectedType === "") {
      const filteredByName = [...allPokemonData].filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(pokemonName.toLowerCase())
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
    } else if (pokemonName === "" && activeFilter === "") {
      setFilteredPokemon(allPokemonData);
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
      {loading && !allPokemonData.length ? (
        <LoadingSpinner />
      ) : (
        <>
          <SearchAndFilter
            allPokemonData={allPokemonData}
            pokemonName={pokemonName}
            setPokemonName={setPokemonName}
            filterPokemon={filterPokemon}
            setFilteredPokemon={setFilteredPokemon}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            setShowPokemon={setShowPokemon}
            setSelectedType={setSelectedType}
            setShowInstructions={setShowInstructions}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            setCurrentPage={setCurrentPage}
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {showPokemon ? (
                <TileSection
                  loading={loading}
                  allPokemonData={allPokemonData}
                  getSinglePokemonData={getSinglePokemonData}
                  filteredPokemon={filteredPokemon}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setActiveFilter={setActiveFilter}
                  setShowFilters={setShowFilters}
                />
              ) : (
                <>{showInstructions && <PokedexInstructions />}</>
              )}
            </>
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
