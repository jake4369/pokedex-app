import React from "react";

const About = ({ selectedPokemon, speciesInfo }) => {
  const getDescription = () => {
    if (speciesInfo !== null) {
      const entry = speciesInfo.flavor_text_entries.find(
        (obj) => obj.language.name === "en"
      );
      return entry ? entry.flavor_text : "Description not available";
    }
    return "Description not available";
  };

  const formatHeight = (height) => {
    return height * 10 + "cm";
  };

  const formatWeight = (weight) => {
    return weight / 100 + "kg";
  };

  const formatAbilities = (abilities) => {
    return abilities
      .map((obj) => obj.ability.name.replace("-", " "))
      .join(", ");
  };

  const formatHabitat = (habitat) => {
    return habitat ? habitat.name.split("-").join(" ") : "Unknown";
  };

  const description = getDescription();
  const height = formatHeight(Number(selectedPokemon.height));
  const weight = formatWeight(Number(selectedPokemon.weight));
  const abilities = selectedPokemon.abilities || [];
  const habitat = speciesInfo?.habitat;

  return (
    <div className="modal-card__about">
      <p className="modal-card__about-description">{description}</p>

      <ul className="modal-card__about-main-info">
        <li>
          <span className="title">Height</span>
          <span className="entries">{height}</span>
        </li>
        <li>
          <span className="title">Weight</span>
          <span className="entries">{weight}</span>
        </li>
        <li>
          <span className="title">Abilities</span>
          <span className="entries">{formatAbilities(abilities)}</span>
        </li>
        <li>
          <span className="title">Habitat</span>
          <span className="entries">{formatHabitat(habitat)}</span>
        </li>
      </ul>

      <h3>Breeding</h3>

      <ul className="modal-card__about-main-info">
        <li>
          <span className="title">Height</span>
          <span className="entries">{height}</span>
        </li>
        <li>
          <span className="title">Weight</span>
          <span className="entries">{weight}</span>
        </li>
        <li>
          <span className="title">Abilities</span>
          <span className="entries">{formatAbilities(abilities)}</span>
        </li>
        <li>
          <span className="title">Habitat</span>
          <span className="entries">{formatHabitat(habitat)}</span>
        </li>
      </ul>
    </div>
  );
};

export default About;
