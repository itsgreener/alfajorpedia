import { useAlfajoresActions } from "./useAlfajores.jsx";
import { useAuthData } from "./useAuth.jsx";
import { useModalStack } from "./useModalStack.js";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import AlfajorModal from "../Components/Modals/AlfajorModal.jsx";

export function useSetFavorites() {
  const { token } = useAuthData();
  const { toggleFavoriteAlfajor } = useAlfajoresActions();
  const { pushModal } = useModalStack();

  async function setFavAlfajor(id, like) {
    if (!token) {
      pushModal(
        <ProtectedPath>
          <AlfajorModal alfajorId={id} />
        </ProtectedPath>,
      );
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
