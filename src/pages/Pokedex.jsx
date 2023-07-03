import { useState, useEffect } from "react";

import LoadingSpinner from "./../components/shared/LoadingSpinner";
import SearchBar from "./../components/pokedex/SearchBar";
import TypeIconContainer from "./../components/pokedex/TypeIconContainer";
import TileSection from "./../components/pokedex/TileSection";
import Modal from "../components/pokedex/modal/Modal";

const Pokedex = () => {
  const [urls, setUrls] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokedexModalOpen, setPokemonModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=3000&offset=0")
      .then((res) => res.json())
      .then((data) => {
        const urls = [...data.results].map((obj) => obj.url);

        if (urls.length > 0) setUrls(urls);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchedData = [];
    const fetchErrors = [];

    const fetchWithRetry = (url, retryCount = 0) => {
      const maxRetries = 3;
      const delayBetweenRetries = 1000;

      if (retryCount > maxRetries) {
        fetchErrors.push(`Exceeded maximum number of retries for ${url}`);
        return;
      }

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          fetchedData.push(data);
        })
        .catch((error) => {
          console.log(`Error fetching data for ${url}:`, error);
          setTimeout(
            () => fetchWithRetry(url, retryCount + 1),
            delayBetweenRetries
          );
        })
        .finally(() => {
          if (fetchedData.length === urls.length) {
            if (fetchErrors.length > 0) {
              console.log("Errors occurred while fetching data:", fetchErrors);
            }

            const sortedData = [...fetchedData].sort((a, b) => a.id - b.id);

            const filteredByName = sortedData.filter((pokemon) =>
              pokemon.name.includes(pokemonName)
            );

            if (pokemonName !== "" && selectedType === "") {
              setPokemonData(filteredByName);
            } else if (selectedType !== "" && pokemonName === "") {
              const filteredByType = sortedData.filter((obj) => {
                return (
                  obj.types[0].type.name === selectedType ||
                  (obj.types[1] && obj.types[1].type.name === selectedType)
                );
              });
              setPokemonData(filteredByType);
            } else {
              setPokemonData(sortedData);
            }

            setLoading(false);
          }
        });
    };

    urls.forEach((url) => fetchWithRetry(url));
  }, [urls, pokemonName, selectedType]);

  const getSinglePokemonData = (e, id) => {
    const typeIconContainer = e.target.closest(".tile__type-icon-container");
    const typeIcon = e.target.closest(".type-icon");

    if (!typeIconContainer && !typeIcon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => setSelectedPokemon(data))
        .catch((error) => console.log(error));
      setPokemonModalOpen(true);
    }
  };

  return (
    <div className="pokedex-page">
      {loading && !pokemonData.length ? ( // Check if loading is true and no pokemonData is available
        <LoadingSpinner />
      ) : (
        <>
          <SearchBar
            setPokemonName={setPokemonName}
            setSelectedType={setSelectedType}
          />

          <TypeIconContainer
            setPokemonName={setPokemonName}
            setSelectedType={setSelectedType}
          />

          {loading ? ( // Render the loading spinner only for the TileSection component
            <LoadingSpinner />
          ) : (
            <TileSection
              loading={loading}
              pokemonData={pokemonData}
              getSinglePokemonData={getSinglePokemonData}
            />
          )}

          {selectedPokemon !== null && (
            <Modal
              data={selectedPokemon}
              pokedexModalOpen={pokedexModalOpen}
              setPokemonModalOpen={setPokemonModalOpen}
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
