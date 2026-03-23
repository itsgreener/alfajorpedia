import { useModalStack } from "./useModalStack.js";
import { useAuthData } from "./useAuth.jsx";
import LoginModal from "../Components/Modals/LoginModal.jsx";

export function useRequireLogin() {
  const { token } = useAuthData();
  const { pushModal } = useModalStack();

  function requireLogin(protectedNode = null) {
    if (token) return true;

    pushModal(<LoginModal protectedNode={protectedNode} />);
    return false;
  }

  return { requireLogin };
}