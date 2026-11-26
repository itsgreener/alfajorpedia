import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../Hooks/useAuth.jsx";
import { validate } from "../../Hooks/useValidation.js";
import { useModalStack } from "../../Hooks/useModalStack.js";
import { useBreakpoint } from "../../Hooks/useBreakpoint.js";
import LoginModal from "./LoginModal.jsx";
import styles from "./RegisterModal.module.css";

function RegisterModal({ protectedNode = null }) {
  const { register } = useAuthActions();
  const { pushModal, clearModalStack } = useModalStack();
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const newErrors = validate(email, password, checked);
    if (!nombre.trim()) newErrors.nombre = "Introduce tu nombre";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setServerError("");

      await register({ email, password, nombre: nombre.trim() });

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
        <div className={styles.mobileRegisterWrapper}>
          <p className="small-title">
            Crea tu cuenta para empezar a guardar tus alfajores
          </p>
          <div className={styles.mobileRegisterTabs}>
            <button
              type="button"
              className={styles.mobileRegisterTab}
              onClick={() =>
                pushModal(<LoginModal protectedNode={protectedNode} />)
              }
            >
              Login
            </button>
            <button type="button" className={`${styles.mobileRegisterTab} ${styles.active}`}>
              Regístrate
            </button>
          </div>
          <form noValidate className={styles.mobileRegisterForm} onSubmit={onSubmit}>
            <div className={styles.mobileRegisterField}>
              <label className={styles.mobileRegisterLabel}>Nombre</label>
              <input className={styles.mobileRegisterInput} value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading} />
            </div>
            <div className={styles.mobileRegisterField}>
              <label className={styles.mobileRegisterLabel}>Email address</label>
              <input
                className={styles.mobileRegisterInput}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.mobileRegisterField}>
              <label className={styles.mobileRegisterLabel}>Password</label>
              <input
                className={styles.mobileRegisterInput}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <label className={styles.mobileRegisterPrivacy}>
              <input
                className={styles.mobileRegisterCheckbox}
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
            {(errors.email || errors.password || errors.nombre || serverError) && (
              <div className={styles.mobileRegisterError}>
                {errors.nombre && <p>{errors.nombre}</p>}
                {errors.email && <p>{errors.email}</p>}
                {errors.password && <p>{errors.password}</p>}
                {serverError && <p>{serverError}</p>}
              </div>
            )}
            <button
              type="submit"
              className={styles.mobileRegisterBtn}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Regístrate"}
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.registerWrapper}>
          <p className="title">
            Crea tu cuenta
            <br />
            <span className="small-title">
              para empezar a guardar tus alfajores.
            </span>
          </p>
          <form noValidate className={styles.registerForm} onSubmit={onSubmit}>
            <label>Nombre <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading} required /></label>
            <section className={styles.registerInputSection}>
              <input
                className={styles.registerInput}
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <input
                className={styles.registerInput}
                type="password"
                placeholder="contraseña"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button type="submit" className={styles.registerBtn} disabled={loading}>
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
            </section>
            <label className={styles.registerPrivacy}>
              <input
                className={styles.registerCheckbox}
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
            <div className={styles.registerError}>
              {errors.nombre && <p>{errors.nombre}</p>}
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
