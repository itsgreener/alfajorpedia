import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Catalog from "./Pages/Catalog.jsx";
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
