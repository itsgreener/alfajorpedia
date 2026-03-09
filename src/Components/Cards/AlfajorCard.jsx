import AddFavoritesButton from "./AddFavoritesButton";
import "./AlfajorCard.css";

function AlfajorCard({ alfajor, onClick, onFavChange }) {
  const { name, flag, weight, calories, description, image } = alfajor;

  return (
    <div className="alfajor-card" onClick={onClick}>
      <div className="card_image-wrapper">
        <img src={image} alt={name} className="card_image" />
      </div>

      <div className="card_body">
        <div className="card_content">
          <p className="card_name">{name}</p>
          <div className="card_meta">
            <img src={flag} alt="Flag" className="card_flag" />
            <span className="card_weight">{weight}</span>
            <span className="card_calories">{calories} Cal</span>
          </div>
          <p className="card_description">{description}</p>
        </div>
        <div className="card_actions">
          <AddFavoritesButton
            active={alfajor.isFav}
            onChange={(like) => onFavChange(alfajor.id, like)}
          />
        </div>
      </div>
    </div>
  );
}

export default AlfajorCard;
