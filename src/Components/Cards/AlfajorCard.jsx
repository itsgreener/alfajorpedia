import { memo } from "react";
import { useSetFavorites } from "../../Hooks/useSetFavorites.jsx";
import AddFavoritesButton from "./AddFavoritesButton";
import "./AlfajorCard.css";

const AlfajorCard = memo(({ alfajor, onClick }) => {
  const { setFavAlfajor } = useSetFavorites();
  const { id, name, weight, calories, tagline, image, isFav } = alfajor;

  const hasValidImage =
    typeof image === "string" &&
    image.trim() !== "" &&
    (image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("/"));

  return (
    <div className="alfajor-card" onClick={onClick}>
      <div className="card-image-wrapper">
        {hasValidImage ? (
          <img src={image} alt={name} className="card-image" />
        ) : (
          <div className="card-image placeholder" />
        )}
      </div>

      <div className="card-body">
        <div className="card-content">
          <p className="card-name">{name}</p>

          <div className="card-meta">
            {weight != null && <span className="card-weight">{weight}g</span>}
            {calories != null && (
              <span className="card-calories">{calories} Cal</span>
            )}
          </div>

          <p className="card-description">{tagline}</p>
        </div>

        <div className="card-actions">
          <AddFavoritesButton
            active={isFav}
            onChange={(like) => setFavAlfajor(id, like)}
          />
        </div>
      </div>
    </div>
  );
});

export default AlfajorCard;