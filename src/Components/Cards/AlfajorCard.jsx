import { memo } from "react";
import { useSetFavorites } from "../../Hooks/useSetFavorites.jsx";
import AddFavoritesButton from "./AddFavoritesButton";
import "./AlfajorCard.css";

const AlfajorCard = memo(({ alfajor, onClick }) => {
  const { setFavAlfajor } = useSetFavorites();
  const { id, nombre, gramos, calorias, tagline, foto_url, isFav } = alfajor;

  const imgUrl = `https://res.cloudinary.com/dnvp65swm/image/upload/f_auto,q_auto/v1774009977/${foto_url}.webp`;

  return (
    <div className="alfajor-card" onClick={onClick}>
      <div className="card-image-wrapper">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={nombre}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="card-image placeholder" />
        )}
      </div>

      <div className="card-body">
        <div className="card-content">
          <p className="card-name">{nombre}</p>

          <div className="card-meta">
            {gramos != null && <span className="card-weight">{gramos}g</span>}
            {calorias != null && (
              <span className="card-calories">{calorias} Cal</span>
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
