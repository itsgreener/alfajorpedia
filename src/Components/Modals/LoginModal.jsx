import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import RegisterModal from "./RegisterModal";
import "./LoginModal.css";

function LoginModal({ onModalOpen, closeModal, protectedNode = null }) {
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
          !protectedNode && closeModal(false);
        }}
      >
        <input
          className="login-input"
          type="email"
          placeholder="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="contraseña"
          autoComplete="current-password"
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
                protectedNode={protectedNode}
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
