import { useState } from "react";
import { useMovies } from "../../hooks/useMovies";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPagination from "../ReactPaginate/ReactPaginate";
import toast from "react-hot-toast";
import css from "./App.module.css";

import type { Movie } from "../../types/movie";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useMovies(query, page);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading &&
        !isError &&
        movies.length === 0 &&
        query &&
        toast.error("No results found")}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          {totalPages > 1 && (
            <ReactPagination
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={({ selected }: { selected: number }) =>
                setPage(selected + 1)
              }
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
