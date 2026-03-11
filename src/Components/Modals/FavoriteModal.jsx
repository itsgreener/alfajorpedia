import { useState } from "react";
import Catalog from "../Groups/Catalog";
import SearchInput from "../Groups/SearchInput";
import AlfajorModal from "./AlfajorModal";
import "./FavoriteModal.css";
import { useFilteredData } from "../../Hooks/useFilteredData";

function FavoriteModal({ alfajores, setFavAlfajor, onModalOpen }) {
  const [searchContent, setSearchContent] = useState("");
  const filtered = useFilteredData(alfajores, searchContent);
  return (
    <>
      <div className="favorites">
        <p className="big-title white-text favorites-title">
          {alfajores.length} Favoritos
        </p>
        <SearchInput onChange={setSearchContent} />
      </div>
      <Catalog
        alfajores={filtered}
        onClick={(alfajor) =>
          onModalOpen(
            <AlfajorModal alfajor={alfajor} onFavChange={setFavAlfajor} />,
          )
        }
        onFavChange={setFavAlfajor}
      />
    </>
  );
}

export default FavoriteModal;
