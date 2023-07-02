import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import Pokedex from "./pages/Pokedex";

const App = () => {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </main>
  );
};

export default App;
