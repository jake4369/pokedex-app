import { motion } from "framer-motion";

import SearchBar from "./SearchBar";
import TypeIconContainer from "./TypeIconContainer";
import GenerationFilterContainer from "./GenerationFilterContainer";

const SearchAndFilter = ({
  allPokemonData,
  pokemonName,
  setPokemonName,
  filterPokemon,
  setFilteredPokemon,
  showFilters,
  setShowFilters,
  setShowPokemon,
  setSelectedType,
  setShowInstructions,
  activeFilter,
  setActiveFilter,
  setCurrentPage,
}) => {
  const handleChange = (e) => {
    setPokemonName("");
    setShowFilters(true);
    setShowPokemon(false);
    setShowInstructions(false);
    setActiveFilter(e.target.value);
    setCurrentPage(1);

    if (e.target.value !== "type" && e.target.value !== "generation") {
      const filteredPokemon = allPokemonData.filter((pokemon) =>
        pokemon.name.includes(`-${e.target.value}`)
      );
      setFilteredPokemon(filteredPokemon);
      setShowFilters(false);
      setShowPokemon(true);
    }
  };

  const handleViewAllBtnClick = () => {
    setShowFilters(false);
    setFilteredPokemon(null);
    setShowPokemon(true);
    setShowInstructions(false);
    setCurrentPage(1);
    setActiveFilter("");
    setPokemonName("");
  };

  return (
    <section className="search-and-filter-section">
      <SearchBar
        allPokemonData={allPokemonData}
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        setSelectedType={setSelectedType}
        filterPokemon={filterPokemon}
        setFilteredPokemon={setFilteredPokemon}
        setActiveFilter={setActiveFilter}
        setShowFilters={setShowFilters}
        setShowPokemon={setShowPokemon}
      />

      <div className="pokedex-page__filter-section">
        <div className="pokedex-page__filter-control-container">
          <select value={activeFilter} onChange={handleChange}>
            <option value="">Select Filter</option>
            <option value="type">Type</option>
            <option value="generation">Generation</option>
            <option value="mega">Mega Evolutions</option>
            <option value="gmax">Gmax Pokemon</option>
            <option value="alola">Alola Pokemon</option>
            <option value="galar">Galar Pokemon</option>
            <option value="hisui">Hisui Pokemon</option>
          </select>
          <button onClick={handleViewAllBtnClick}>view all</button>
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
                  setActiveFilter={setActiveFilter}
                  setCurrentPage={setCurrentPage}
                  setShowFilters={setShowFilters}
                  setShowPokemon={setShowPokemon}
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
                <GenerationFilterContainer
                  allPokemonData={allPokemonData}
                  setFilteredPokemon={setFilteredPokemon}
                  setActiveFilter={setActiveFilter}
                  setShowPokemon={setShowPokemon}
                  setShowFilters={setShowFilters}
                  setCurrentPage={setCurrentPage}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchAndFilter;
