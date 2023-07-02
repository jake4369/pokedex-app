import { useEffect } from "react";
import PokedexModalCard from "./PokedexModalCard";

const PokedexModal = ({
  data,
  pokedexModalOpen,
  setPokemonModalOpen,
  setSelectedPokemon,
}) => {
  useEffect(() => {
    if (pokedexModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      const timeoutId = setTimeout(() => {
        document.body.style.overflowY = "auto";
      }, 300);

      return () => {
        clearTimeout(timeoutId);
        document.body.style.overflowY = "auto"; // Reset body overflow to "auto"
      };
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
      <PokedexModalCard
        data={data}
        setPokemonModalOpen={setPokemonModalOpen}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
};

export default PokedexModal;
