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
    if (pokedexModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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
