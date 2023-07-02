import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setPokemonName, setSelectedType }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedType("");
    if (name !== "") {
      setPokemonName(name.toLowerCase());
      setName("");
    }
  };

  return (
    <form className="search-bar__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search by name..."
        value={name}
        onChange={handleChange}
      />

      <button className="search-bar__btn">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
