const cardColors = {
  pokedex: "rgb(111, 191, 167)",
  moves: "rgb(231, 127, 111)",
  abilities: "rgb(109, 167, 238)",
  items: "rgb(247, 208, 99)",
  locations: "rgb(117, 84, 136)",
  "type chart": "rgb(169, 117, 111)",
};

const CategoryCard = ({ category }) => {
  return (
    <div
      className="category-card"
      style={{
        backgroundColor: cardColors[category],
      }}
    >
      {category}
    </div>
  );
};

export default CategoryCard;
