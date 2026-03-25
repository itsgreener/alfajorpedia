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
        <SearchInput onChange={setSearchContent} isMobile={true} />
        <svg
          width="24"
          height="17"
          viewBox="0 0 24 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.33333H23M1 1H23M1 15.6667H23"
            stroke="var(--black)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mobile-catalog-content">
        <p className="title">{alfajores.length} alfajores</p>
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
