import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<{ results: Movie[]; total_pages: number }> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  const { results, total_pages } = response.data;
  return { results, total_pages };
};


