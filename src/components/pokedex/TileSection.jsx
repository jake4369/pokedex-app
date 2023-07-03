import { useState } from "react";

import PokemonTile from "./PokemonTile";
import Pagination from "./Pagination";

const TileSection = ({ loading, pokemonData, getSinglePokemonData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const tiles =
    !loading &&
    [...pokemonData].slice(startIndex, endIndex).map((obj) => {
      return (
        <PokemonTile
          key={obj.id}
          data={obj}
          getSinglePokemonData={getSinglePokemonData}
        />
      );
    });

  return (
    <section className="tile-section">
      {/* TILES */}
      <div className="tile-grid">{tiles}</div>

      {/* PAGINATION */}
      {pokemonData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(pokemonData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default TileSection;