const FilterBtn = ({ children, onFilterBtnClick }) => {
  return (
    <button onClick={onFilterBtnClick} className="pokedex-page__filter-btn">
      {children}
    </button>
  );
};

export default FilterBtn;
