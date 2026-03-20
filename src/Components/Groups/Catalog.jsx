import { useState, useRef } from "react";
import AlfajorCard from "../Cards/AlfajorCard";
import "./Catalog.css";

export default function Catalog({ alfajores, onClick, items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);

  const totalPages = Math.ceil(alfajores.length / items);
  const startIndex = (currentPage - 1) * items;
  const endIndex = startIndex + items;
  const currentItems = alfajores.slice(startIndex, endIndex);

  function scrollToTop() {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const maxVisiblePages = 5;

  let startPage = currentPage;
  let endPage = currentPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <>
      {totalPages > 0 && (
        <div
          ref={ref}
          className="catalogo-list"
          style={{ "--repeat": `${items / 4}` }}
        >
          {currentItems.map((alfajor) => (
            <AlfajorCard
              key={alfajor.id}
              alfajor={alfajor}
              onClick={() => onClick(alfajor)}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        {totalPages ? (
          <>
            <button
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                scrollToTop();
              }}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => {
                  setCurrentPage(page);
                  scrollToTop();
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
                scrollToTop();
              }}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </>
        ) : (
          <p className="no-results">No se encontraron resultados</p>
        )}
      </div>
    </>
  );
}