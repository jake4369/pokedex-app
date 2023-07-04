import LoadingData from "./LoadingData";

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

  // console.log(speciesInfo);

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
            <li>
              <span className="title">Species</span>
              <span className="entries">{speciesType}</span>
            </li>

            <li>
              <span className="title">
                {types.length > 1 ? "Types" : "Type"}
              </span>
              <span className="entries">{formatTypes(types)}</span>
            </li>

            <li>
              <span className="title">Habitat</span>
              <span className="entries">{formatHabitat(habitat)}</span>
            </li>

            <li>
              <span className="title">Height</span>
              <span className="entries">{height}</span>
            </li>

            <li>
              <span className="title">Weight</span>
              <span className="entries">{weight}</span>
            </li>

            <li>
              <span className="title">Color</span>
              <span className="entries">{color}</span>
            </li>

            <li>
              <span className="title">Abilities</span>
              <span className="entries">{formatAbilities(abilities)}</span>
            </li>

            <li>
              <span className="title">
                {eggGroups.length > 1 ? "Egg groups" : "Egg group"}
              </span>
              <span className="entries">{formatEggGroups(eggGroups)}</span>
            </li>
          </ul>
        </div>
      ) : (
        <LoadingData />
      )}
    </div>
  );
};

export default About;
