import LoginModal from "../Components/Modals/LoginModal.jsx";
import { useAuth } from "../Hooks/useAuth.js";

function ProtectedPath({ children, onModalOpen, closeModal }) {
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <LoginModal
      onModalOpen={onModalOpen}
      closeModal={closeModal}
      fromProtected={true}
    />
  );
}

export default ProtectedPath;
