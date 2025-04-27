import "./App.css";
import { SearchForm } from "./components/SearchForm/SearchForm.tsx";
import { GenreSelect } from "./components/GenreSelect/GenreSelect.tsx";
import { MovieTile } from "./components/MovieTile/MovieTile.tsx";
import { useEffect, useRef, useState } from "react";
import {
  SortControl,
  SortOption,
} from "./components/SortControl/SortControl.tsx";
import { Movie } from "./models/movie.interface.ts";
import { MovieDetails } from "./components/MovieDetails/MovieDetails.tsx";
import { MoviesResponse } from "./models/api.ts";

const genres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [sort, setSort] = useState(SortOption.ReleaseDate);
  const [query, setQuery] = useState("Star Wars");

  const abortControllerRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("New request started");
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        setLoading(true);

        const filter =
          selectedGenre === "ALL" ? "" : selectedGenre.toLowerCase();

        const response = await fetch(
          `http://localhost:4000/movies?search=${query}&filter=${filter}&searchBy=title&sortBy=${sort}&sortOrder=asc`,
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
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Component unmounted");
      }
    };
  }, [query, selectedGenre, sort]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      ) : (
        <SearchForm onSearch={setQuery} initialQuery={query} />
      )}
      <div className="flex gap-4 justify-between">
        <GenreSelect
          genres={genres}
          onSelect={setSelectedGenre}
          selectedGenre={selectedGenre}
        />
        <SortControl currentSort={sort} onSortChange={setSort} />
      </div>
      <div className="flex flex-wrap gap-4 grow">
        {movies.length ? (
          movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onClick={(movie) => setSelectedMovie(movie)}
              onEdit={(movie) => console.log("Edit:", movie)}
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
