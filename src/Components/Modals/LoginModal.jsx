import { useState } from "react";
import { useAuthActions } from "../../Hooks/useAuth";
import RegisterModal from "./RegisterModal";
import "./LoginModal.css";
import { validate } from "../../Hooks/useValidation";

function LoginModal({ onModalOpen, closeModal, protectedNode = null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuthActions();

  function onSubmit(e) {
    e.preventDefault();
    const newErrors = validate(email, password);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login({ email, password });
    !protectedNode && closeModal();
  }

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
        noValidate
        className="login-form"
        onSubmit={(e) => {
          onSubmit(e);
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
      {(errors.email || errors.password || errors.checked) && (
        <div className="login-error">
          {errors.email && <p>{errors.email}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.checked && <p>{errors.checked}</p>}
        </div>
      )}
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
