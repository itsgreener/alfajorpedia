import { useAlfajoresActions } from "./useAlfajores.jsx";
import { useAuthData } from "./useAuth.jsx";

export function useSetFavorites() {
  const { token } = useAuthData();
  const { toggleFavoriteAlfajor } = useAlfajoresActions();

  async function setFavAlfajor(id, like) {
    if (!token) {
      console.warn("No autenticado");
    }

    await toggleFavoriteAlfajor(id, like);
  }

  return { setFavAlfajor };
}