import { useAlfajoresActions } from "./useAlfajores.jsx";
import { useAuthData } from "./useAuth.jsx";
import { useModalStack } from "./useModalStack.js";
import LoginModal from "../Components/Modals/LoginModal.jsx";

export function useSetFavorites() {
  const { token } = useAuthData();
  const { toggleFavoriteAlfajor } = useAlfajoresActions();
  const { pushModal } = useModalStack();

  async function setFavAlfajor(id, like) {
    if (!token) {
      pushModal(<LoginModal />);
      return;
    }

    await toggleFavoriteAlfajor(id, like);
  }

  return { setFavAlfajor };
}