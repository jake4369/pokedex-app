import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const categoriesArray = [
    "pokedex",
    "moves",
    "abilities",
    "items",
    "locations",
    "type chart",
  ];

  const categoryCards = categoriesArray.map((category) => {
    return (
      <Link to={`/${category}`} key={category}>
        <CategoryCard category={category} />
      </Link>
    );
  });
  return <div className="categories">{categoryCards}</div>;
};

export default Categories;
