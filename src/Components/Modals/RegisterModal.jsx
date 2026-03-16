import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth.js";
import LoginModal from "./LoginModal.jsx";
import ProtectedPath from "../../Context/ProtectedRoute.jsx";
import "./RegisterModal.css";

function RegisterModal({ onModalOpen, closeModal, protectedNode = null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 7) {
      newErrors.password = "La contraseña debe tener al menos 7 caracteres";
    }

    if (!checked) {
      newErrors.checked = "Debes aceptar la política de privacidad";
    }

    return newErrors;
  }

  function onSubmit(e) {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    register({ email, password });
    protectedNode ? onModalOpen(protectedNode) : closeModal();
  }

  return (
    <div className="register-wrapper">
      <p className="title">
        Crea tu cuenta
        <br />
        <span className="small-title">
          para empezar a guardar tus alfajores.
        </span>
      </p>
      <form noValidate className="register-form" onSubmit={(e) => onSubmit(e)}>
        <section className="register-input-section">
          <input
            className="register-input"
            type="email"
            placeholder="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="contraseña"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="register-btn">
            Crear cuenta
          </button>
        </section>
        <div className="register-privacy">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            required
            style={{ opacity: 0 }}
          />
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
      {(errors.email || errors.password || errors.checked) && (
        <div className="register-error">
          {errors.email && <p>{errors.email}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.checked && <p>{errors.checked}</p>}
        </div>
      )}
    </div>
  );
}

export default RegisterModal;
