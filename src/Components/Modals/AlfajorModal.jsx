import AddFavoritesButton from "../Cards/AddFavoritesButton.jsx";
import "./AlfajorModal.css";

function AlfajorModal({ alfajor, onFavChange }) {
  return (
    <div className="alfajor-detail">
      <img
        className="alfajor-detail-img"
        src={alfajor.image}
        alt={alfajor.name}
      />

      <div className="alfajor-detail-info">
        <p className="alfajor-detail-name">{alfajor.name}</p>

        <div className="alfajor-detail-meta">
          <img
            className="alfajor-detail-flag"
            src={alfajor.flag}
            alt="Bandera"
          />
          <span>{alfajor.weight}g</span>
          <span>{alfajor.calories} Cal</span>
        </div>

        <p className="alfajor-detail-tagline">
          <strong>{alfajor.tagline}</strong>
        </p>

        <p className="alfajor-detail-description">{alfajor.description}</p>

        <div className="alfajor-detail-footer">
          <div className="alfajor-detail-socials">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="#111" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#111"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
            </svg>
          </div>

          <AddFavoritesButton
            active={alfajor.isFav}
            onChange={(like) => onFavChange(alfajor.id, like)}
          />
        </div>
      </div>
    </div>
  );
}

export default AlfajorModal;
