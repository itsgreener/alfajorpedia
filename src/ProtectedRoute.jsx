import LoginModal from "./Components/Modals/LoginModal";
import RegisterModal from "./Components/Modals/RegisterModal";
import { useAuth } from "./Hooks/useAuth";

function ProtectedPath({ children, setModalContent }) {
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <LoginModal onRegister={() => setModalContent(<RegisterModal />)} />
  );
}

export default ProtectedPath;
