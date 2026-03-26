import { useState } from "react";
import { useAuthActions } from "../../Hooks/useAuth";
import { validate } from "../../Hooks/useValidation";
import { useModalStack } from "../../Hooks/useModalStack";
import RegisterModal from "./RegisterModal";
import "./LoginModal.css";
import { useBreakpoint } from "../../Hooks/useBreakpoint";

function LoginModal({ protectedNode = null }) {
  const { pushModal, clearModalStack } = useModalStack();
  const { login } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isMobile } = useBreakpoint();

async function onSubmit(e) {
  e.preventDefault();
  const newErrors = validate(email, password);
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

try {
      setLoading(true);
      setErrors({});
      setServerError("");

      await login({ email, password });

clearModalStack();

if (protectedNode) {
  pushModal(protectedNode);
}
    } catch (err) {
      setServerError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

   return (
    <> {isMobile ?
        <div className="mobile-login-wrapper">
      <div className="mobile-login-card">
        <p className="mobile-login-title">
          Ingresa a tu
          <br />
          cuenta y guarda tus
          <br />
          alfajores favoritos
        </p>

        <div className="mobile-login-tabs">
          <button type="button" className="mobile-login-tab active">
            Login
          </button>

          <button
            type="button"
            className="mobile-login-tab"
            onClick={() =>
              pushModal(
                <RegisterModal
                  protectedNode={protectedNode}
                  isMobile={isMobile}
                />
              )
            }
          >
            Regístrate
          </button>
        </div>

        <form
          noValidate
          className="mobile-login-form"
          onSubmit={onSubmit}
        >
          <div className="mobile-login-field">
            <label className="mobile-login-label">Email address</label>
            <input
              className="mobile-login-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mobile-login-field">
            <label className="mobile-login-label">Password</label>
            <input
              className="mobile-login-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="button" className="mobile-login-forgot">
            Olvidaste tu contraseña?
          </button>

          {(errors.email || errors.password || serverError) && (
            <div className="mobile-login-error">
              {errors.email && <p>{errors.email}</p>}
              {errors.password && <p>{errors.password}</p>}
              {serverError && <p>{serverError}</p>}
            </div>
          )}

          <button
            type="submit"
            className="mobile-login-btn"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    :
    <div className="login-wrapper">
      <p className="title">
        Ingresa a tu cuenta
        <br />
        <span className="small-title">
          para guardar tus alfajores favoritos.
        </span>
      </p>

      <form noValidate className="login-form" onSubmit={onSubmit}>
        <input
          className="login-input"
          type="email"
          placeholder="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="login-input"
          type="password"
          placeholder="contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Entrando..." : "Ingresar"}
        </button>
      </form>

      {(errors.email || errors.password || serverError) && (
        <div className="login-error">
          {errors.email && <p>{errors.email}</p>}
          {errors.password && <p>{errors.password}</p>}
          {serverError && <p>{serverError}</p>}
        </div>
      )}

      <p className="login-footer">
        o{" "}
        <button
          type="button"
          onClick={() =>
            pushModal(
              <RegisterModal
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
}
    </>
  );
}

export default LoginModal;