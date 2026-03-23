import LoginModal from "../Components/Modals/LoginModal.jsx";
import { useAuthData } from "../Hooks/useAuth.jsx";

function ProtectedPath({ children }) {
  const { user, authLoading } = useAuthData();

  if (authLoading) {
    return <p className="text">Cargando...</p>;
  }

  return user ? children : <LoginModal protectedNode={children} />;
}

export default ProtectedPath;