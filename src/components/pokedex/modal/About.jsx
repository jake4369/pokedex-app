import LoadingData from "./LoadingData";

import StatEntry from "./StatEntry";

const About = ({ selectedPokemon, speciesInfo, speciesInfoLoaded }) => {
  const getDescription = () => {
    if (speciesInfo !== null) {
      const entry = speciesInfo.flavor_text_entries.find(
        (obj) => obj.language.name === "en"
      );
      return entry ? entry.flavor_text : "Description not available";
    }
    return "Description not available";
  };

  const getSpeciesType = () => {
    if (speciesInfo !== null) {
      const entry = speciesInfo.genera.find(
        (obj) => obj.language.name === "en"
      );
      return entry ? entry.genus : "Unknown";
    }
    return "Unknown";
  };

  const formatHeight = (height) => {
    return height * 10 + "cm";
  };

  const formatWeight = (weight) => {
    return weight / 100 + "kg";
  };

  const formatTypes = (types) => {
    return types ? types.map((type) => type.type.name).join(", ") : "None";
  };

  const formatAbilities = (abilities) => {
    return abilities
      .map((obj) => obj.ability.name.replace("-", " "))
      .join(", ");
  };

  const formatHabitat = (habitat) => {
    return habitat ? habitat.name.split("-").join(" ") : "Unknown";
  };

  const formatEggGroups = (eggGroups) => {
    return eggGroups
      ? eggGroups.map((group) => group.name.replace("-", " ")).join(", ")
      : "None";
  };

  const description = getDescription();
  const speciesType = getSpeciesType();
  const types = selectedPokemon.types || [];
  const color = speciesInfo?.color.name;
  const height = formatHeight(Number(selectedPokemon.height));
  const weight = formatWeight(Number(selectedPokemon.weight));
  const abilities = selectedPokemon.abilities || [];
  const habitat = speciesInfo?.habitat;
  const eggGroups = speciesInfo?.egg_groups || [];

  return (
    <div className="modal-card__about">
      {speciesInfoLoaded ? (
        <div
          style={{
            opacity: 0,
          }}
          className="fade-in-fwd"
        >
          <p className="modal-card__about-description">{description}</p>

          <ul className="modal-card__about-main-info">
            <StatEntry title="Species" value={speciesType} />

            <StatEntry
              title={types.length > 1 ? "Types" : "Type"}
              value={formatTypes(types)}
            />

            <StatEntry title="Habitat" value={formatHabitat(habitat)} />

            <StatEntry title="Height" value={height} />

            <StatEntry title="Weight" value={weight} />

            <StatEntry title="Color" value={color} />

            <StatEntry title="Abilities" value={formatAbilities(abilities)} />

            <StatEntry
              title={eggGroups.length > 1 ? "Egg groups" : "Egg group"}
              value={formatEggGroups(eggGroups)}
            />
          </ul>
        </div>
      ) : (
        <LoadingData />
      )}
    </div>
  );
};

export default About;
