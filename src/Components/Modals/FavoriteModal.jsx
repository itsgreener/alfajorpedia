import { useAlfajoresActions } from "../../Hooks/useAlfajores";
import CatalogSection from "../Groups/CatalogSection";

function FavoriteModal() {
  const { favoriteAlfajores } = useAlfajoresActions();
  const favoriteList = favoriteAlfajores();

  return (
    <CatalogSection
      alfajores={favoriteList}
      fromFavorite={true}
    />
  );
}

export default FavoriteModal;
