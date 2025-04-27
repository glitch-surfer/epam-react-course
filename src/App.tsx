import "./App.css";
import { GenreSelect } from "./components/GenreSelect/GenreSelect.tsx";
import { MovieTile } from "./components/MovieTile/MovieTile.tsx";
import { useEffect, useRef, useState } from "react";
import {
  SortControl,
  SortOption,
} from "./components/SortControl/SortControl.tsx";
import { Movie } from "./models/movie.interface.ts";
import { MoviesResponse } from "./models/api.ts";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const genres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") ?? "Star Wars";
  const selectedGenre = searchParams.get("genre") ?? genres[0];
  const sort = searchParams.get("sort") ?? SortOption.ReleaseDate;
  const isMovieDetailsOpen = useLocation().pathname !== "/";

  const abortControllerRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();

      try {
        const filter =
          selectedGenre === "ALL" ? "" : selectedGenre.toLowerCase();

        const response = await fetch(
          `http://localhost:4000/movies?search=${query}&filter=${filter}&searchBy=title&sortBy=${sort}&sortOrder=desc`,
          { signal: abortController.signal },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status.toString()}`);
        }
        const result = (await response.json()) as MoviesResponse;
        setMovies(result.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }

      abortControllerRef.current = abortController;
    };

    fetchData();
  }, [query, selectedGenre, sort]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery, genre: selectedGenre, sort });
  };

  const handleGenreChange = (newGenre: string) => {
    setSearchParams({ query, genre: newGenre, sort });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSearchParams({ query, genre: selectedGenre, sort: newSort });
  };

  const setSelectedMovie = (movie: Movie) =>
    navigate(`/${movie.id.toString()}?${searchParams.toString()}`);

  const handleEdit = (movie: Movie) => navigate(`/${movie.id.toString()}/edit`);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {!isMovieDetailsOpen && (
        <Link className="self-end" to={`/new?${searchParams.toString()}`}>
          Add movie
        </Link>
      )}
      <Outlet context={{ onSearch: handleSearch, initialQuery: query }} />
      <div className="flex gap-4 justify-between">
        <GenreSelect
          genres={genres}
          onSelect={handleGenreChange}
          selectedGenre={selectedGenre}
        />
        <SortControl
          currentSort={sort as SortOption}
          onSortChange={handleSortChange}
        />
      </div>
      <div className="flex flex-wrap gap-4 grow">
        {movies.length ? (
          movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onClick={(movie) => setSelectedMovie(movie)}
              onEdit={(movie) => handleEdit(movie)}
              onDelete={(movie) => console.log("Delete:", movie)}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
