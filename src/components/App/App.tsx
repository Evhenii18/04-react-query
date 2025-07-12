import { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPagination from "../ReactPaginate/ReactPaginate";
import { Toaster, toast } from "react-hot-toast";

import css from "./App.module.css";
import type { Movie } from "../../types/movie";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useMovies(query, page);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    if (!isLoading && !isError && movies.length === 0 && query) {
      toast.error("No results found");
    }
  }, [isLoading, isError, movies.length, query]);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && movies.length > 0 && (
        <>
          {totalPages > 1 && (
            <ReactPagination
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
            />
          )}
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
