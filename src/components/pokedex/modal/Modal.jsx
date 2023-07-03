import { useEffect } from "react";
import Card from "./Card";

const Modal = ({
  data,
  pokedexModalOpen,
  selectedPokemon,
  setPokemonModalOpen,
  setSelectedPokemon,
}) => {
  useEffect(() => {
    const mainElement = document.querySelector("main");

    if (pokedexModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      mainElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      mainElement.style.overflowY = "auto";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
      mainElement.style.overflowX = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
      mainElement.style.overflowY = "auto";
      document.documentElement.style.overflowX = "hidden";
      mainElement.style.overflowX = "hidden";
    };
  }, [pokedexModalOpen]);

  const handleCloseModal = (event) => {
    const isCard = event.target.closest(".pokedex-modal__card");

    if (!isCard) {
      setPokemonModalOpen(false);
      setSelectedPokemon(null);
      document.body.style.overflowY = "auto";
    }
  };

  return (
    <div className="pokedex-modal" onClick={handleCloseModal}>
      <Card
        data={data}
        setPokemonModalOpen={setPokemonModalOpen}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
};

export default Modal;
