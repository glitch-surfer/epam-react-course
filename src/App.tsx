import './App.css'
import {Counter} from "./components/counter.tsx";
import {SearchForm} from "./components/search-form.tsx";

function App() {
    return (
        <div className="flex flex-col gap-4">
            <SearchForm onSearch={console.log} initialQuery="Star Wars"/>
            <div className="card">
                <Counter initialValue={42}/>
            </div>
        </div>
    )
}

export default App
