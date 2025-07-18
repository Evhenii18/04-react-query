import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieService';

export const useMovies = (query: string, page: number) => {
  return useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query, 
    staleTime: 1000 * 60 * 5,
  });
};
