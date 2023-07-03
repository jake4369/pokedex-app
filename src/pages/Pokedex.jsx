import { useState, useEffect } from "react";

import LoadingSpinner from "./../components/shared/LoadingSpinner";
import SearchBar from "./../components/pokedex/SearchBar";
import TypeIconContainer from "./../components/pokedex/TypeIconContainer";
import TileSection from "./../components/pokedex/TileSection";
import PokedexModal from "./../components/pokedex/PokedexModal";

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
    const fetchData = () => {
      const fetchedData = [];

      const fetchPromises = urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => fetchedData.push(data))
          .catch((error) =>
            console.log(`Error fetching data for ${url}:`, error)
          )
      );

      Promise.all(fetchPromises)
        .then(() => {
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
        })
        .catch((error) => console.log("Error while fetching data:", error));
    };

    if (urls.length > 0) {
      fetchData();
    }
  }, [urls, pokemonName, selectedType]);

  // const galarPokemon = pokemonData.filter((pokemon) =>
  //   pokemon.name.includes("galar")
  // );

  // const hisuiPokemon = pokemonData.filter((pokemon) =>
  //   pokemon.name.includes("hisui")
  // );

  // const gmaxPokemon = pokemonData.filter((pokemon) =>
  //   pokemon.name.includes("gmax")
  // );

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

  console.log(selectedPokemon);

  return (
    <div className="pokedex-page">
      <SearchBar
        setPokemonName={setPokemonName}
        setSelectedType={setSelectedType}
      />

      <TypeIconContainer
        setPokemonName={setPokemonName}
        setSelectedType={setSelectedType}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TileSection
          loading={loading}
          pokemonData={pokemonData}
          getSinglePokemonData={getSinglePokemonData}
        />
      )}

      {selectedPokemon !== null && (
        <PokedexModal
          data={selectedPokemon}
          pokedexModalOpen={pokedexModalOpen}
          setPokemonModalOpen={setPokemonModalOpen}
          setSelectedPokemon={setSelectedPokemon}
        />
      )}
    </div>
  );
};

export default Pokedex;
