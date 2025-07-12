import type { FC } from "react";
import ReactPaginate from "react-paginate";
import css from "./ReactPaginate.module.css";

interface ReactPaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const ReactPagination: FC<ReactPaginationProps> = ({
  pageCount,
  forcePage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default ReactPagination;
