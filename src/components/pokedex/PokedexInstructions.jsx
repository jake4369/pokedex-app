import rotomDex from "./../../assets/rotomdex.png";

const PokedexInstructions = () => {
  return (
    <div className="pokedex-instructions">
      <img src={rotomDex} alt="" />
      <p>Use the search bar or buttons to find your favourite Pokemon</p>
    </div>
  );
};

export default PokedexInstructions;
