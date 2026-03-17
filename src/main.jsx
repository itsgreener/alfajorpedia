import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import AlfajoresProvider from "./Context/AlfajoresProvider.jsx";
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
