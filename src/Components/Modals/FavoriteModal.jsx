import { useMemo, useState } from "react";
import Catalog from "../Groups/Catalog";
import SearchInput from "../Groups/SearchInput";
import AlfajorModal from "./AlfajorModal";
import "./FavoriteModal.css";

function FavoriteModal({
  alfajores,
  setFavAlfajor,
  onModalOpen,
}) {
  const [searchContent, setSearchContent] = useState("");
  const filtered = useMemo(
    () =>
      alfajores.filter(
        (i) =>
          i.name.toLowerCase().includes(searchContent.toLowerCase()) ||
          i.description.toLowerCase().includes(searchContent.toLowerCase()) ||
          i.tagline.toLowerCase().includes(searchContent.toLowerCase()) ||
          i.producer.toLowerCase().includes(searchContent.toLowerCase()) ||
          i.importer?.toLowerCase().includes(searchContent.toLowerCase()) ||
          i.brands.some((b) =>
            b.toLowerCase().includes(searchContent.toLowerCase()),
          ) ||
          i.categories.some((c) =>
            c.toLowerCase().includes(searchContent.toLowerCase()),
          ),
      ),
    [alfajores, searchContent],
  );
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
