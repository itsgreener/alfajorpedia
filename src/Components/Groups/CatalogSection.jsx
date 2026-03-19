import { useFilteredData } from "../../Hooks/useFilteredData";
import { useModalStack } from "../../Hooks/useModalStack";
import AlfajorModal from "../Modals/AlfajorModal";
import Catalog from "./Catalog";
import SearchInput from "./SearchInput";
import "./CatalogSection.css";

function CatalogSection({ alfajores, fromFavorite = false }) {
  const { pushModal } = useModalStack();
  const { filteredData, setSearchContent } = useFilteredData(alfajores);
  
  return (
    <section className="catalog-section">
      <div className="catalog-header" id="catalog">
        <p className="big-title white-text catalogo-title">
          {alfajores.length} {fromFavorite ? "Favoritos" : "Alfajores"}
        </p>
        <SearchInput onChange={setSearchContent} />
      </div>
      <div className={fromFavorite ? "catalog-content" : "catalog-padding catalog-content"}>
        <Catalog
          alfajores={filteredData}
          onClick={(alfajor) =>
            pushModal(
              <AlfajorModal
                alfajorId={alfajor.id}
              />,
            )
          }
          items={fromFavorite ? 16 : 20}
        />
      </div>
    </section>
  );
}

export default CatalogSection;
