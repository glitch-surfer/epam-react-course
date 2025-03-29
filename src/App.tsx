import "./App.css";
import { Counter } from "./components/Counter/Counter.tsx";
import { SearchForm } from "./components/SearchForm.tsx";
import { GenreSelect } from "./components/GenreSelect/GenreSelect.tsx";

function App() {
  const genres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

  return (
    <div className="flex flex-col gap-4">
      <SearchForm onSearch={console.log} initialQuery="Star Wars" />
      <GenreSelect
        genres={genres}
        onSelect={console.log}
        selectedGenre={genres[0]}
      />
      <div className="card">
        <Counter initialValue={42} />
      </div>
    </div>
  );
}

export default App;
