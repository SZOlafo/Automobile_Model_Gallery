import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModelList from "./pages/ModelList";
import DetailsView from "./pages/DetailsView";

function App() {
    return (
        <BrowserRouter>
            <Navbar>
                <Routes>
                    <Route path="/" element={<ModelList />} />
                    <Route path="/:id" element={<DetailsView />} />
                </Routes>
            </Navbar>
        </BrowserRouter>

    )
}

export default App;