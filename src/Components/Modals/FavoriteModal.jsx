import { useFilteredData } from "../../Hooks/useFilteredData";
import { useAlfajoresData } from "../../Hooks/useAlfajores";
import Catalog from "../Groups/Catalog";
import SearchInput from "../Groups/SearchInput";
import AlfajorModal from "./AlfajorModal";
import "./FavoriteModal.css";

function FavoriteModal({ setFavAlfajor, onModalOpen }) {
  const { favoriteAlfajores } = useAlfajoresData();
  const filtered = useFilteredData(favoriteAlfajores);
  return (
    <>
      <div className="favorites">
        <p className="big-title white-text favorites-title">
          {favoriteAlfajores.length} Favoritos
        </p>
        <SearchInput />
      </div>
      <Catalog
        alfajores={filtered}
        onClick={(alfajor) =>
          onModalOpen(
            <AlfajorModal alfajorId={alfajor.id} onFavChange={setFavAlfajor} />,
          )
        }
        onFavChange={setFavAlfajor}
        items={16}
      />
    </>
  );
}

export default FavoriteModal;
