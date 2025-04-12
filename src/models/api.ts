import { Movie } from "./movie.interface.ts";

export interface MoviesResponse {
  data: Movie[];
  total: number;
  offset: number;
  limit: number;
}
