import { memo } from "react";
import { useSetFavorites } from "../../Hooks/useSetFavorites.jsx";
import AddFavoritesButton from "./AddFavoritesButton";
import { getCloudinaryImageUrl } from "../../Helpers/alfajoresDisplay.js";
import "./AlfajorCard.css";

const AlfajorCard = memo(({ alfajor, onClick }) => {
  const { setFavAlfajor } = useSetFavorites();

  const {
    id,
    nombre,
    pais,
    gramos,
    calorias,
    tagline,
    foto_url,
    website,
    instagram,
    tiktok,
    isFav,
  } = alfajor;

  const imgUrl = getCloudinaryImageUrl(foto_url);
  const flagName = pais
    ?.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    <div className="alfajor-card" onClick={onClick}>
      <div className="card-image-wrapper">
        <img
          src={imgUrl || "/placeholder.webp"}
          alt={nombre}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.webp";
          }}
        />
      </div>

      <div className="card-body">
        <div className="card-content">
          <p className="card-name">{nombre}</p>

          <div className="card-meta">
            <img
              src={`/Flags/${flagName}.webp`}
              alt={pais}
              className="card-flag"
            />
            {gramos && <span className="card-weight">{gramos}g</span>}
            {calorias && <span className="card-calories">{calorias} kcal</span>}
          </div>

          <p className="card-description">{tagline}</p>

          <div className="card-socials">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Web"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            )}

            {instagram && (
              <a
                href={
                  instagram.startsWith("http")
                    ? instagram
                    : `https://www.instagram.com/${instagram}`
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            )}

            {tiktok && (
              <a
                href={
                  tiktok.startsWith("http")
                    ? tiktok
                    : `https://www.tiktok.com/${tiktok}`
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.88-3.39c.27 0 .53.03.78.1V9.01a6.3 6.3 0 0 0-.78-.05 6.34 6.34 0 1 0 6.33 6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75c-.35 0-.69-.02-1-.06z" />
                </svg>
              </a>
            )}
          </div>
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
