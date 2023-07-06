import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import LoadingSpinner from "./../components/shared/LoadingSpinner";
import SearchBar from "./../components/pokedex/SearchBar";
import FilterBtn from "../components/pokedex/FilterBtn";
import TypeIconContainer from "./../components/pokedex/TypeIconContainer";
import GenerationFilterContainer from "./../components/pokedex/GenerationFilterContainer";
import TileSection from "./../components/pokedex/TileSection";
import Modal from "../components/pokedex/modal/Modal";

const Pokedex = ({ allPokemonData, loading }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(null);
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

  const onFilterBtnClick = (e) => {
    if (activeFilter === e.target.textContent) {
      setActiveFilter("");
      setShowFilters(false);
    } else {
      setActiveFilter(e.target.textContent);
      setShowFilters(true);
    }
  };

  return (
    <div className="pokedex-page">
      {loading && !allPokemonData.length ? (
        <LoadingSpinner />
      ) : (
        <>
          <SearchBar
            setPokemonName={setPokemonName}
            setSelectedType={setSelectedType}
            filterPokemon={filterPokemon}
            setFilteredPokemon={setFilteredPokemon}
          />

          <section className="pokedex-page__filter-section">
            <div
              className="pokedex-page__filter-btns"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 auto 2rem auto",
                width: "170px",
              }}
            >
              <p>Filter by: </p>
              <FilterBtn onFilterBtnClick={onFilterBtnClick}>type</FilterBtn>
              <FilterBtn onFilterBtnClick={onFilterBtnClick}>
                generation
              </FilterBtn>
            </div>

            {showFilters && (
              <>
                {activeFilter === "type" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    className="pokedex-page__filter-container"
                  >
                    <TypeIconContainer
                      setPokemonName={setPokemonName}
                      setSelectedType={setSelectedType}
                      filterPokemon={filterPokemon}
                      setCurrentPage={setCurrentPage}
                      setShowFilters={setShowFilters}
                    />
                  </motion.div>
                )}
                {activeFilter === "generation" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    className="pokedex-page__filter-container"
                  >
                    {" "}
                    <GenerationFilterContainer />
                  </motion.div>
                )}
              </>
            )}
          </section>

          {loading ? (
            <LoadingSpinner />
          ) : (
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
