import LoginModal from "../Components/Modals/LoginModal.jsx";
import { useAuthData } from "../Hooks/useAuth.js";

function ProtectedPath({ children, onModalOpen, closeModal }) {
  const { user } = useAuthData();
  return user ? (
    children
  ) : (
    <LoginModal
      onModalOpen={onModalOpen}
      closeModal={closeModal}
      protectedNode={children}
    />
  );
}

export default ProtectedPath;
