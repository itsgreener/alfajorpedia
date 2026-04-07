import { useEffect, useState, useMemo } from "react";
import { useFilteredData } from "../../Hooks/useFilteredData";
import { useModalStack } from "../../Hooks/useModalStack";
import { useBreakpoint } from "../../Hooks/useBreakpoint";
import AlfajorModal from "../Modals/AlfajorModal";
import Catalog from "./Catalog";
import SearchInput from "./SearchInput";
import styles from "./CatalogSection.module.css";

function shuffleArray(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function CatalogSection({ alfajores, fromFavorite = false, randomSeed }) {
  const { pushModal } = useModalStack();
  const { isMobile } = useBreakpoint();
  const [randomOrder, setRandomOrder] = useState([]);

  const shuffleSignature = useMemo(
    () => alfajores.map((a) => `${a.id}:${a.foto_url}`).join("|"),
    [alfajores],
  );

  useEffect(() => {
    if (fromFavorite) {
      setRandomOrder(alfajores);
      return;
    }

    if (alfajores.length > 0) {
      setRandomOrder(shuffleArray(alfajores));
    } else {
      setRandomOrder([]);
    }
  }, [shuffleSignature, fromFavorite, randomSeed]);

  useEffect(() => {
    if (fromFavorite) {
      setRandomOrder(alfajores);
      return;
    }

    setRandomOrder((prev) =>
      prev.map((item) => {
        const actual = alfajores.find((a) => Number(a.id) === Number(item.id));
        return actual ? { ...item, isFav: actual.isFav } : item;
      }),
    );
  }, [alfajores, fromFavorite]);

  const sourceData = fromFavorite ? alfajores : randomOrder;
  const { filteredData, setSearchContent } = useFilteredData(sourceData);

  return (
    <section className={styles.catalogSection}>
      {isMobile && fromFavorite ? (
        <p className={`${styles.mobileCatalogTitle} small-title`}>
          {alfajores.length} {fromFavorite ? "Favoritos" : "Alfajores"}
        </p>
      ) : (
        <div className={styles.catalogHeader} id="catalog">
          <p className={`${styles.catalogTitle} big-title white-text`}>
            {alfajores.length} {fromFavorite ? "Favoritos" : "Alfajores"}
          </p>
          <SearchInput onChange={setSearchContent} />
        </div>
      )}

      <div
        className={
          fromFavorite
            ? styles.catalogContent
            : `${styles.catalogPadding} ${styles.catalogContent}`
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
