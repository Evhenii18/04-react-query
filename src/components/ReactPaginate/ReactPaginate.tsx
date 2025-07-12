import ReactPaginate from "react-paginate";
import css from "./ReactPaginate.module.css";

interface ReactPaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: ({ selected }: { selected: number }) => void;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  nextLabel?: string;
  previousLabel?: string;
}

export default function ReactPagination({
  pageCount,
  forcePage,
  onPageChange,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
  nextLabel = "→",
  previousLabel = "←",
}: ReactPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
