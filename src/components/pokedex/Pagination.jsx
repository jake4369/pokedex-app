import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import PaginationBtn from "./PaginationBtn";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="pagination">
      <div className="pagination__btn-container">
        <PaginationBtn
          isDisabled={currentPage === 1}
          handleClick={() => handlePageChange(currentPage - 1)}
          classname="prev-page-btn"
        >
          <GrFormPrevious className="btn-arrow" />
          <p>Prev</p>
        </PaginationBtn>
        <PaginationBtn
          isDisabled={currentPage === totalPages}
          handleClick={() => handlePageChange(currentPage + 1)}
          classname="next-page-btn"
        >
          <p>Next</p>
          <GrFormNext className="btn-arrow" />
        </PaginationBtn>
      </div>
      <span className="current-page-num">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
