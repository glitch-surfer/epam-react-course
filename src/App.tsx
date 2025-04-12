import "./App.css";
import { SearchForm } from "./components/SearchForm/SearchForm.tsx";
import { GenreSelect } from "./components/GenreSelect/GenreSelect.tsx";
import { MovieTile } from "./components/MovieTile/MovieTile.tsx";
import { useState } from "react";
import {
  SortControl,
  SortOption,
} from "./components/SortControl/SortControl.tsx";
import { Movie } from "./models/movie.interface.ts";
import { MovieDetails } from "./components/MovieDetails/MovieDetails.tsx";

const mockMovies = [
  {
    id: "1",
    imageUrl: "https://example.com/pulp-fiction.jpg",
    name: "Pulp Fiction",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
  },
  {
    id: "2",
    imageUrl: "https://example.com/the-shawshank-redemption.jpg",
    name: "The Shawshank Redemption",
    releaseYear: 1994,
    genres: ["Drama"],
  },
  {
    id: "3",
    imageUrl: "https://example.com/the-dark-knight.jpg",
    name: "The Dark Knight",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: "4",
    imageUrl: "https://example.com/interstellar.jpg",
    name: "Interstellar",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: "5",
    imageUrl: "https://example.com/forrest-gump.jpg",
    name: "Forrest Gump",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
  },
];
const genres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

function App() {
  const [movies, setMovies] = useState(mockMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [sort, setSort] = useState(SortOption.ReleaseDate);
  const [query, setQuery] = useState("Star Wars");

  return (
    <div className="flex flex-col gap-4">
      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie as any}/*todo refactor*/
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
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={(movie) => setSelectedMovie(movie)}
            onEdit={(movie) => console.log("Edit:", movie)}
            onDelete={(movie) => console.log("Delete:", movie)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
