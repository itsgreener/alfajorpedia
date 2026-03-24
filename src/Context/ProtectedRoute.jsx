import LoginModal from "../Components/Modals/LoginModal.jsx";
import { useAuthData } from "../Hooks/useAuth.jsx";

function ProtectedPath({ children }) {
  const { user } = useAuthData();
  return user ? (
    children
  ) : (
    <LoginModal
      protectedNode={children}
    />
  );
}

export default ProtectedPath;
