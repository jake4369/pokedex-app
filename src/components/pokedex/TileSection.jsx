import { useState } from "react";

import PokemonTile from "./PokemonTile";
import Pagination from "./Pagination";

const TileSection = ({
  loading,
  allPokemonData,
  getSinglePokemonData,
  filteredPokemon,
  currentPage,
  setCurrentPage,
  setShowFilters,
  setActiveFilter,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const tiles =
    !loading &&
    (filteredPokemon ? filteredPokemon : allPokemonData)
      .slice(startIndex, endIndex)
      .map((obj) => {
        return (
          <PokemonTile
            key={obj.id}
            pokemonData={obj}
            getSinglePokemonData={getSinglePokemonData}
            setShowFilters={setShowFilters}
            setActiveFilter={setActiveFilter}
          />
        );
      });

  const numResults = filteredPokemon
    ? filteredPokemon.length
    : allPokemonData.length;

  return (
    <section className="tile-section">
      {/* TILES */}
      <div className="tile-grid">{tiles}</div>

      {/* PAGINATION */}
      {allPokemonData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(numResults / itemsPerPage)}
          onPageChange={setCurrentPage}
          setShowFilters={setShowFilters}
        />
      )}
    </section>
  );
};

export default TileSection;
