import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import Homepage from "./pages/Homepage";
import Pokedex from "./pages/Pokedex";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

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

            setAllPokemonData(sortedData);

            setLoading(false);
          }
        });
    };

    urls.forEach((url) => fetchWithRetry(url));
  }, [urls]);

  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/pokedex"
          element={
            <Pokedex allPokemonData={allPokemonData} loading={loading} />
          }
        />
      </Routes>
    </main>
  );
};

export default App;
