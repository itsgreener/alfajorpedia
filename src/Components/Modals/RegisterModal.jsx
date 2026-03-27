import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../Hooks/useAuth.jsx";
import { validate } from "../../Hooks/useValidation.js";
import { useModalStack } from "../../Hooks/useModalStack.js";
import { useBreakpoint } from "../../Hooks/useBreakpoint.js";
import LoginModal from "./LoginModal.jsx";
import "./RegisterModal.css";

function RegisterModal({ protectedNode = null }) {
  const { register } = useAuthActions();
  const { pushModal, clearModalStack } = useModalStack();
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const newErrors = validate(email, password, checked);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setServerError("");

      await register({ email, password });

      protectedNode ? pushModal(protectedNode) : clearModalStack();
    } catch (err) {
      setServerError(err.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isMobile ? (
        <div className="mobile-register-wrapper">
          <p className="small-title">
            Crea tu cuenta para empezar a guardar tus alfajores
          </p>
          <div className="mobile-register-tabs">
            <button
              type="button"
              className="mobile-register-tab"
              onClick={() =>
                pushModal(<LoginModal protectedNode={protectedNode} />)
              }
            >
              Login
            </button>
            <button type="button" className="mobile-register-tab active">
              Regístrate
            </button>
          </div>
          <form noValidate className="mobile-register-form" onSubmit={onSubmit}>
            <div className="mobile-register-field">
              <label className="mobile-register-label">Email address</label>
              <input
                className="mobile-register-input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mobile-register-field">
              <label className="mobile-register-label">Password</label>
              <input
                className="mobile-register-input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <label className="mobile-register-privacy">
              <input
                className="register-checkbox"
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                required
              />
              He leído y acepto la{" "}
              <button type="button" onClick={() => navigate("/privacy")}>
                <strong>Política de Privacidad</strong>
              </button>
            </label>
            {(errors.email || errors.password || serverError) && (
              <div className="mobile-register-error">
                {errors.email && <p>{errors.email}</p>}
                {errors.password && <p>{errors.password}</p>}
                {serverError && <p>{serverError}</p>}
              </div>
            )}
            <button
              type="submit"
              className="mobile-register-btn"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Regístrate"}
            </button>
          </form>
        </div>
      ) : (
        <div className="register-wrapper">
          <p className="title">
            Crea tu cuenta
            <br />
            <span className="small-title">
              para empezar a guardar tus alfajores.
            </span>
          </p>
          <form noValidate className="register-form" onSubmit={onSubmit}>
            <section className="register-input-section">
              <input
                className="register-input"
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <input
                className="register-input"
                type="password"
                placeholder="contraseña"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
            </section>
            <label className="register-privacy">
              <input
                className="register-checkbox"
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                required
              />
              He leído y acepto la{" "}
              <button type="button" onClick={() => navigate("/privacy")}>
                <strong>Política de Privacidad</strong>
              </button>
            </label>
          </form>
          {(errors.email ||
            errors.password ||
            errors.checked ||
            serverError) && (
            <div className="register-error">
              {errors.email && <p>{errors.email}</p>}
              {errors.password && <p>{errors.password}</p>}
              {errors.checked && <p>{errors.checked}</p>}
              {serverError && <p>{serverError}</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default RegisterModal;
