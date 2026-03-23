import { useState } from "react";
import { useAuthActions } from "../../Hooks/useAuth";
import RegisterModal from "./RegisterModal";
import { validate } from "../../Hooks/useValidation";
import { useModalStack } from "../../Hooks/useModalStack";
import "./LoginModal.css";

function LoginModal({ protectedNode = null }) {
  const { pushModal, clearModalStack } = useModalStack();
  const { login } = useAuthActions();

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
                onModalOpen={pushModal}
                closeModal={clearModalStack}
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