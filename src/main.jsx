import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./Hooks/useAuth.jsx";
import { AlfajoresProvider } from "./Hooks/useAlfajores.jsx";
import ModalProvider from "./Context/ModalProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AlfajoresProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AlfajoresProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);