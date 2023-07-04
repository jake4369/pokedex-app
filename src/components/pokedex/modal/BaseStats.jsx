const progressBarColors = {
  hp: "rgb(111, 191, 167)",
  attack: "rgb(231, 127, 111)",
  defense: "rgb(109, 167, 238)",
  "special-attack": "rgb(247, 208, 99)",
  "special-defense": "rgb(117, 84, 136)",
  speed: "rgb(169, 117, 111)",
};

const BaseStats = ({ selectedPokemon }) => {
  let statsData;

  if (selectedPokemon !== null) {
    statsData = selectedPokemon.stats;
  }

  const stats = statsData.map((stat) => {
    const baseStatPercentage = (stat.base_stat / 255) * 100; // Adjust the denominator based on your desired maximum value

    const barStyle = {
      width: "100%", // Set the overall width to 100%
    };

    const progressBarStyle = {
      width: `${baseStatPercentage}%`, // Set the width of the red progress bar
      backgroundColor: progressBarColors[stat.stat.name],
    };

    return (
      <li key={stat.stat.name} className="base-stat-container">
        <span className="stat-title">
          {stat.stat.name}:{" "}
          <span className="stat-number">{stat.base_stat}</span>
        </span>
        <div className="base-stats__bar" style={barStyle}>
          <div
            className="base-stats__bar-progress scale-in-hor-left"
            style={progressBarStyle}
          ></div>
        </div>
      </li>
    );
  });

  return <ul className="modal-card__base-stats fade-in-fwd">{stats}</ul>;
};

export default BaseStats;
