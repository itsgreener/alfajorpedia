import LoginModal from "../Components/Modals/LoginModal.jsx";
import { useAuthData } from "../Hooks/useAuth.jsx";
import { useModalStack } from "../Hooks/useModalStack.js";

function ProtectedPath({ children }) {
  const { pushModal, clearModalStack } = useModalStack();
  const { user } = useAuthData();
  return user ? (
    children
  ) : (
    <LoginModal
      onModalOpen={pushModal}
      closeModal={clearModalStack}
      protectedNode={children}
    />
  );
}

export default ProtectedPath;
