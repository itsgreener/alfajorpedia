import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import FavoriteModal from "./FavoriteModal";
import ProtectedPath from "../../ProtectedRoute";
import "./RegisterModal.css";

function RegisterModal({ onModalOpen, closeModal, fromFavorite = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="register-wrapper">
      <p className="title">
        Crea tu cuenta
        <br />
        <span className="small-title">
          para empezar a guardar tus alfajores.
        </span>
      </p>
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          register({ email, password });
          onModalOpen(
            fromFavorite ? (
              <ProtectedPath onModalOpen={onModalOpen} closeModal={closeModal}>
                <FavoriteModal />
              </ProtectedPath>
            ) : (
              <LoginModal onModalOpen={onModalOpen} closeModal={closeModal} />
            ),
          );
        }}
      >
        <section className="register-input-section">
          <input
            className="register-input"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="register-btn">
            Crear cuenta
          </button>
        </section>
        <div className="register-privacy">
          <button
            className={`register-checkbox ${checked ? "checked" : ""}`}
            onClick={() => setChecked(!checked)}
            aria-checked={checked}
            role="checkbox"
            type="button"
          >
            <svg className="register-checkmark" viewBox="0 0 16 16">
              <polyline points="2,8 6,12 14,4" />
            </svg>
          </button>
          <p className="register-footer">
            He leído y acepto la{" "}
            <button onClick={() => navigate("/privacy")}>
              <strong>Política de Privacidad</strong>
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
