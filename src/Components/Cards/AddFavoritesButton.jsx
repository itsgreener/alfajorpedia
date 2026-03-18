import { memo } from "react";
import "./AddFavoritesButton.css";

const AddFavoritesButton = memo(function AddFavoritesButton({
  active = false,
  onChange,
}) {
  const toggle = (e) => {
    e.stopPropagation();
    onChange?.(!active);
  };

  return (
    <button
      onClick={toggle}
      className="favorite-btn"
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill={active ? "var(--black)" : "none"}
        stroke="var(--black)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
});

export default AddFavoritesButton;
