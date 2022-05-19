import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({
  totalQuantity,
  itemsPerPage,
  paginate,
  next,
  previous,
  currentPageState,
}) => {
  let totalPages = [];

  for (let i = 1; i <= Math.ceil(totalQuantity / itemsPerPage); i++) {
    totalPages.push(i);
  }

  return (
    <div className={classes.pagination_container}>
      <ul className="pagination justify-content-center">
        {currentPageState > 1 && (
          <a
            href="#!"
            onClick={previous}
            className="page-link"
            style={{
              cursor: "pointer",
            }}
          >
            Previous
          </a>
        )}
        {totalPages.map((number) => (
          <li
            className={`page-item ${
              number === currentPageState ? "active" : "null"
            }`}
            key={number}
          >
            <a
              onClick={() => paginate(number)}
              className={"page-link "}
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
        {totalPages.length - currentPageState !== 0 && (
          <a
            href="#!"
            className="page-link"
            onClick={next}
            style={{
              cursor: "pointer",
            }}
          >
            Next
          </a>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
