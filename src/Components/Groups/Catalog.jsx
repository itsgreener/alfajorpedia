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
    ref.current.scrollIntoView();
  }

  return (
    <>
      {totalPages > 0 && (
        <div ref={ref} className="catalogo-list" style={{ '--repeat': `${items / 4}` }}>
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
