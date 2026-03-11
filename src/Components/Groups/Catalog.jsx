import { useState, useRef } from "react";
import AlfajorCard from "../Cards/AlfajorCard";
import "./Catalog.css";

const ITEMS_PER_PAGE = 20;

export default function Catalog({ alfajores, onClick, onFavChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);

  const totalPages = Math.ceil(alfajores.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = alfajores.slice(startIndex, endIndex);

  function scrollToTop() {
    ref.current.scrollIntoView();
  }

  return (
    <>
      <div ref={ref} className="catalogo-list">
        {currentItems.map((alfajor) => (
          <AlfajorCard
            key={alfajor.id}
            alfajor={alfajor}
            onClick={() => onClick(alfajor)}
            onFavChange={onFavChange}
          />
        ))}
      </div>
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
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => {
                  setCurrentPage(index + 1);
                  scrollToTop();
                }}
              >
                {index + 1}
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
