import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Privacy from "./Pages/Privacy.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
