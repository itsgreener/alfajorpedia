import { useEffect, useRef, useState } from "react";
import { useFilteredData } from "../../Hooks/useFilteredData";
import { useModalStack } from "../../Hooks/useModalStack";
import AlfajorModal from "../Modals/AlfajorModal";
import Catalog from "./Catalog";
import SearchInput from "./SearchInput";
import "./CatalogSection.css";

function shuffleArray(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function CatalogSection({ alfajores, fromFavorite = false }) {
  const { pushModal } = useModalStack();
  const [randomOrder, setRandomOrder] = useState([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (fromFavorite) {
      setRandomOrder(alfajores);
      return;
    }

    if (!initializedRef.current && alfajores.length > 0) {
      setRandomOrder(shuffleArray(alfajores));
      initializedRef.current = true;
    }
  }, [alfajores, fromFavorite]);

  const sourceData = fromFavorite ? alfajores : randomOrder;
  const { filteredData, setSearchContent } = useFilteredData(sourceData);

  return (
    <section className="catalog-section">
      <div className="catalog-header" id="catalog">
        <p className="big-title white-text catalogo-title">
          {alfajores.length} {fromFavorite ? "Favoritos" : "Alfajores"}
        </p>
        <SearchInput onChange={setSearchContent} />
      </div>

      <div
        className={
          fromFavorite ? "catalog-content" : "catalog-padding catalog-content"
        }
      >
        <Catalog
          alfajores={filteredData}
          onClick={(alfajor) =>
            pushModal(<AlfajorModal alfajorId={alfajor.id} />)
          }
          items={fromFavorite ? 16 : 20}
        />
      </div>
    </section>
  );
}

export default CatalogSection;