import { useState } from "react";
import { useAuthActions } from "../../Hooks/useAuth";
import { validate } from "../../Hooks/useValidation";
import { useModalStack } from "../../Hooks/useModalStack";
import { useBreakpoint } from "../../Hooks/useBreakpoint";
import RegisterModal from "./RegisterModal";
import styles from "./LoginModal.module.css";

function LoginModal({ protectedNode = null }) {
  const { pushModal, clearModalStack } = useModalStack();
  const { login } = useAuthActions();
  const { isMobile } = useBreakpoint();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <>
      {isMobile ? (
        <div className={styles.mobileLoginWrapper}>
          <p className="small-title">
            Ingresa a tu cuenta <br /> y guarda tus alfajores favoritos
          </p>
          <div className={styles.mobileLoginTabs}>
            <button type="button" className={`${styles.mobileLoginTab} ${styles.active}`}>
              Login
            </button>
            <button
              type="button"
              className={styles.mobileLoginTab}
              onClick={() =>
                pushModal(<RegisterModal protectedNode={protectedNode} />)
              }
            >
              Regístrate
            </button>
          </div>
          <form noValidate className={styles.mobileLoginForm} onSubmit={onSubmit}>
            <div className={styles.mobileLoginField}>
              <label className={styles.mobileLoginLabel}>Email address</label>
              <input
                className={styles.mobileLoginInput}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.mobileLoginField}>
              <label className={styles.mobileLoginLabel}>Password</label>
              <input
                className={styles.mobileLoginInput}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {/* 
            <button type="button" className="mobile-login-forgot">
              Olvidaste tu contraseña?
            </button>
            */}
            {(errors.email || errors.password || serverError) && (
              <div className={styles.mobileLoginError}>
                {errors.email && <p>{errors.email}</p>}
                {errors.password && <p>{errors.password}</p>}
                {serverError && <p>{serverError}</p>}
              </div>
            )}
            <button
              type="submit"
              className={styles.mobileLoginBtn}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.loginWrapper}>
          <p className="title">
            Ingresa a tu cuenta
            <br />
            <span className="small-title">
              para guardar tus alfajores favoritos.
            </span>
          </p>

          <form noValidate className={styles.loginForm} onSubmit={onSubmit}>
            <input
              className={styles.loginInput}
              type="email"
              placeholder="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              className={styles.loginInput}
              type="password"
              placeholder="contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? "Entrando..." : "Ingresar"}
            </button>
          </form>

          {(errors.email || errors.password || serverError) && (
            <div className={styles.loginError}>
              {errors.email && <p>{errors.email}</p>}
              {errors.password && <p>{errors.password}</p>}
              {serverError && <p>{serverError}</p>}
            </div>
          )}

          <p className={styles.loginFooter}>
            o{" "}
            <button
              type="button"
              onClick={() =>
                pushModal(<RegisterModal protectedNode={protectedNode} />)
              }
            >
              <strong>regístrate</strong>
            </button>{" "}
            si aún no lo has hecho
          </p>
        </div>
      )}
    </>
  );
}

export default LoginModal;
