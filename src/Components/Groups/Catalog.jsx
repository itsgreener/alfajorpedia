import AlfajorCard from "../Cards/AlfajorCard";
import "./Catalog.css";
import { useState } from "react";


const ITEMS_PER_PAGE = 20;

export default function Catalog({ alfajores, onClick, onFavChange }) {
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(alfajores.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const currentItems = alfajores.slice(startIndex, endIndex);

  return (
    <>
      <div className="catalogo-list">
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
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
