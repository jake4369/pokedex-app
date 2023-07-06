const FilterBtn = ({ children, onFilterBtnClick }) => {
  return <button onClick={onFilterBtnClick}>{children}</button>;
};

export default FilterBtn;
