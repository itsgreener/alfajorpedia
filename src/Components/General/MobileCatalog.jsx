import { useFilteredData } from "../../Hooks/useFilteredData";
import { useModalStack } from "../../Hooks/useModalStack";
import AlfajorModal from "../Modals/AlfajorModal";
import Catalog from "../Groups/Catalog";
import SearchInput from "../Groups/SearchInput";
import "./MobileCatalog.css";

function MobileCatalog({ alfajores }) {
  const { pushModal } = useModalStack();
  const { filteredData, setSearchContent } = useFilteredData(alfajores);

  return (
    <section className="mobile-catalog-section">
      <div className="mobile-catalog-header" id="catalog">
        <p className="big-title mobile-catalog-title">
          {alfajores.length} Alfajores
        </p>
        <SearchInput onChange={setSearchContent} isMobile={true} />
      </div>
      <div className={"mobile-catalog-padding mobile-catalog-content"}>
        <Catalog
          alfajores={filteredData}
          onClick={(alfajor) =>
            pushModal(<AlfajorModal alfajorId={alfajor.id} />)
          }
          items={20}
        />
      </div>
    </section>
  );
}

export default MobileCatalog;
