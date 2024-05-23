import { Route, Routes } from "react-router-dom";
import ArraysPage from "./pages/ArraysPage";
import HomePage from "./pages/HomePage";

import "./index.css";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage apiUrl={API_URL} />} />
            <Route path="/arrays/" element={<ArraysPage apiUrl={API_URL} />} />
        </Routes>
    );
}

export default App;
