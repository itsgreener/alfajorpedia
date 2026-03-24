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

    try {
      await toggleFavoriteAlfajor(id, like);
    } catch (error) {
      console.error("Error actualizando favorito:", error);
      alert(error.message || "Error actualizando favorito");
    }
  }

  return { setFavAlfajor };
}