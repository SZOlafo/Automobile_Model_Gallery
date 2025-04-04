import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModelList from "./pages/ModelList";
import DetailsView from "./pages/DetailsView";

function App() {
    return (
        <Navbar>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ModelList />} />
                    <Route path="/:id" element={<DetailsView />} />
                </Routes>
            </BrowserRouter>
        </Navbar>
    )
}

export default App;