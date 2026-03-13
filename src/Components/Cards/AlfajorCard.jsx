import AddFavoritesButton from "./AddFavoritesButton";
import "./AlfajorCard.css";

function AlfajorCard({ alfajor, onClick, onFavChange }) {
  const { name, flag, weight, calories, tagline, image, isFav } = alfajor;

  return (
    <div className="alfajor-card" onClick={onClick}>
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="card-body">
        <div className="card-content">
          <p className="card-name">{name}</p>
          <div className="card-meta">
            <img src={flag} alt="Flag" className="card-flag" />
            <span className="card-weight">{weight}g</span>
            <span className="card-calories">{calories} Cal</span>
          </div>
          <p className="card-description">{tagline}</p>
        </div>
        <div className="card-actions">
          <AddFavoritesButton
            active={isFav}
            onChange={(like) => onFavChange(alfajor.id, like)}
          />
        </div>
      </div>
    </div>
  );
}

export default AlfajorCard;
