const PaginationBtn = ({ isDisabled, handleClick, classname, children }) => {
  return (
    <button disabled={isDisabled} onClick={handleClick} className={classname}>
      {children}
    </button>
  );
};

export default PaginationBtn;
