import AlfajorCard from "../Cards/AlfajorCard";
import "./Catalog.css";

export default function Catalog({ alfajores, onClick, onFavChange }) {
  return (
    <div className="catalogo-list">
      {alfajores.map((alfajor) => (
        <AlfajorCard
          alfajor={alfajor}
          onClick={() => onClick(alfajor)}
          onFavChange={onFavChange}
        />
      ))}
    </div>
  );
}
