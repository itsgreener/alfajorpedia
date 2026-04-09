import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Privacy from "./Pages/Privacy.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { useModalStack } from "./Hooks/useModalStack.js";
import EmptyModal from "./Components/Modals/EmptyModal.jsx";

function App() {
  const { currentModal } = useModalStack();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {currentModal && <EmptyModal>{currentModal}</EmptyModal>}
    </>
  );
}

export default App;
