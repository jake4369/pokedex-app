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

const GenerationFilterContainer = () => {
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

  const cards = images.map((img, index) => {
    return (
      <GenerationFilterCard
        key={index}
        img={img}
        numeral={convertToRoman(index + 1)}
      />
    );
  });

  return <div className="generation-filter__card-container">{cards}</div>;
};

export default GenerationFilterContainer;
