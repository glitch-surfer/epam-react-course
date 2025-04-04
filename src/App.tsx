import "./App.css";
import { Counter } from "./components/Counter/Counter.tsx";
import { SearchForm } from "./components/SearchForm/SearchForm.tsx";
import { GenreSelect } from "./components/GenreSelect/GenreSelect.tsx";
import { MovieTile } from "./components/MovieTile/MovieTile.tsx";
import { useState } from "react";

const movies = [
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
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  return (
    <div className="flex flex-col gap-4">
      <SearchForm onSearch={console.log} initialQuery="Star Wars" />
      <GenreSelect
        genres={genres}
        onSelect={setSelectedGenre}
        selectedGenre={selectedGenre}
      />
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={(movie) => console.log("Clicked:", movie)}
            onEdit={(movie) => console.log("Edit:", movie)}
            onDelete={(movie) => console.log("Delete:", movie)}
          />
        ))}
      </div>
      <div className="card">
        <Counter initialValue={42} />
      </div>
    </div>
  );
}

export default App;
