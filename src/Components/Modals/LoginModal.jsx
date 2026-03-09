import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import "./LoginModal.css";

function LoginModal({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  return (
    <div className="login-wrapper">
      <p className="title">
        <span className="big-title">Ingresa a tu cuenta</span>
        <br />
        para guardar tus alfajores favoritos.
      </p>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password });
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
        o <button onClick={onRegister}><strong>regístrate</strong></button> si aún no lo has hecho
      </p>
    </div>
  );
}

export default LoginModal;
