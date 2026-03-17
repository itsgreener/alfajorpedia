import { useAlfajoresActions } from "../../Hooks/useAlfajores";
import CatalogSection from "../Groups/CatalogSection";

function FavoriteModal({ setFavAlfajor }) {
  const { favoriteAlfajores } = useAlfajoresActions();
  const favoriteList = favoriteAlfajores();

  return (
    <CatalogSection
      alfajores={favoriteList}
      setFavAlfajor={setFavAlfajor}
      isFavorite={true}
    />
  );
}

export default FavoriteModal;
