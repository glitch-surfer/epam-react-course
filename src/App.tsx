import './App.css'
import {Counter} from "./components/counter.tsx";

function App() {
    return (
        <>
            <div className="card">
                <Counter initialValue={42}/>
            </div>
        </>
    )
}

export default App
