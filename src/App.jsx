import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Privacy from "./Pages/Privacy.jsx";
import Favorites from "./Pages/Favorites.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
