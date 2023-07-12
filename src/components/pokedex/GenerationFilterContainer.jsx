import GenerationFilterCard from "./GenerationFilterCard";

import genOneImg from "./../../assets/starterpokemon/gen-i.png";
import genTwoImg from "./../../assets/starterpokemon/gen-ii.png";
import genThreeImg from "./../../assets/starterpokemon/gen-iii.png";
import genFourImg from "./../../assets/starterpokemon/gen-iv.png";
import genFiveImg from "./../../assets/starterpokemon/gen-v.png";
import genSixImg from "./../../assets/starterpokemon/gen-vi.png";
import genSevenImg from "./../../assets/starterpokemon/gen-vii.png";
import genEightImg from "./../../assets/starterpokemon/gen-viii.png";
import genNineImg from "./../../assets/starterpokemon/gen-ix.png";

const images = [
  genOneImg,
  genTwoImg,
  genThreeImg,
  genFourImg,
  genFiveImg,
  genSixImg,
  genSevenImg,
  genEightImg,
  genNineImg,
];

const GenerationFilterContainer = ({
  allPokemonData,
  setFilteredPokemon,
  setShowFilters,
  setShowPokemon,
  setCurrentPage,
}) => {
  function convertToRoman(num) {
    const romanNumerals = [
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 8, numeral: "VIII" },
      { value: 7, numeral: "VII" },
      { value: 6, numeral: "VI" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 3, numeral: "III" },
      { value: 2, numeral: "II" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].numeral;
        num -= romanNumerals[i].value;
      }
    }
    return result;
  }

  const filterPokemon = (startNum, endNum) => {
    return allPokemonData
      .filter((pokemon) => pokemon.id >= startNum && pokemon.id <= endNum)
      .sort((a, b) => a.id - b.id);
  };

  const handleClick = (index) => {
    if (index === 0) {
      setFilteredPokemon(filterPokemon(1, 151));
    } else if (index === 1) {
      setFilteredPokemon(filterPokemon(152, 251));
    } else if (index === 2) {
      setFilteredPokemon(filterPokemon(252, 386));
    } else if (index === 3) {
      setFilteredPokemon(filterPokemon(387, 493));
    } else if (index === 4) {
      setFilteredPokemon(filterPokemon(494, 649));
    } else if (index === 5) {
      setFilteredPokemon(filterPokemon(650, 721));
    } else if (index === 6) {
      setFilteredPokemon(filterPokemon(722, 809));
    } else if (index === 7) {
      setFilteredPokemon(filterPokemon(810, 905));
    } else if (index === 8) {
      setFilteredPokemon(filterPokemon(906, 1010));
    }

    setShowFilters(false);
    setShowPokemon(true);
    setCurrentPage(1);
  };

  const cards = images.map((img, index) => {
    return (
      <GenerationFilterCard
        key={index}
        img={img}
        numeral={convertToRoman(index + 1)}
        allPokemonData={allPokemonData}
        onCardClick={() => handleClick(index)}
      />
    );
  });

  return <div className="generation-filter__card-container">{cards}</div>;
};

export default GenerationFilterContainer;
