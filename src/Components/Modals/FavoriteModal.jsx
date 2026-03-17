import { useAlfajoresData } from "../../Hooks/useAlfajores";
import CatalogSection from "../Groups/CatalogSection";

function FavoriteModal({ setFavAlfajor }) {
  const { favoriteAlfajores } = useAlfajoresData();
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
