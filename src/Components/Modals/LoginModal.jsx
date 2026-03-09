import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import RegisterModal from "./RegisterModal";
import "./LoginModal.css";

function LoginModal({ onModalOpen, closeModal, fromFavorite = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  return (
    <div className="login-wrapper">
      <p className="title">
        Ingresa a tu cuenta
        <br />
        <span className="small-title">
          para guardar tus alfajores favoritos.
        </span>
      </p>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password });
          !fromFavorite && closeModal(false);
        }}
      >
        <input
          className="login-input"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn">
          Ingresar
        </button>
      </form>
      <p className="login-footer">
        o{" "}
        <button
          onClick={() =>
            onModalOpen(
              <RegisterModal
                onModalOpen={onModalOpen}
                closeModal={closeModal}
                fromFavorite={fromFavorite}
              />,
            )
          }
        >
          <strong>regístrate</strong>
        </button>{" "}
        si aún no lo has hecho
      </p>
    </div>
  );
}

export default LoginModal;
