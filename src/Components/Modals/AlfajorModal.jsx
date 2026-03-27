import { useAlfajoresActions } from "../../Hooks/useAlfajores.jsx";
import { useSetFavorites } from "../../Hooks/useSetFavorites.jsx";
import { getCloudinaryImageUrl } from "../../Helpers/alfajoresDisplay.js";
import { useBreakpoint } from "../../Hooks/useBreakpoint.js";
import AddFavoritesButton from "../Cards/AddFavoritesButton.jsx";
import "./AlfajorModal.css";

function AlfajorModal({ alfajorId }) {
  const { setFavAlfajor } = useSetFavorites();
  const { alfajorById } = useAlfajoresActions();
  const selectedAlfajor = alfajorById(alfajorId.id ?? alfajorId);
  const { isMobile } = useBreakpoint();

  const imgUrl = getCloudinaryImageUrl(selectedAlfajor.foto_url);
  const flagName = selectedAlfajor?.pais
    ?.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    <div className={isMobile ? "mobile-alfajor-detail" : "alfajor-detail"}>
      {isMobile && (
        <div className="favorites-button-mobile">
          <AddFavoritesButton
            active={selectedAlfajor.isFav}
            onChange={(like) => setFavAlfajor(selectedAlfajor.id, like)}
          />
        </div>
      )}
      {selectedAlfajor ? (
        <>
          {isMobile && (
            <p className="title text-center">{selectedAlfajor.nombre}</p>
          )}
          <img
            className={
              isMobile ? "mobile-alfajor-detail-img" : "alfajor-detail-img"
            }
            src={imgUrl || "/placeholder.webp"}
            alt={selectedAlfajor.nombre}
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder.webp";
            }}
          />

          <div
            className={
              isMobile
                ? "alfajor-detail-info text-center"
                : "alfajor-detail-info"
            }
          >
            {!isMobile && <p className="title">{selectedAlfajor.nombre}</p>}
            {isMobile ? (
              <div className="alfajor-detail-mobile-wrapper">
                <div className="alfajor-detail-meta-mobile text-center">
                  <img
                    src={`/Flags/${flagName}.webp`}
                    alt={selectedAlfajor.pais}
                    className="alfajor-detail-flag"
                  />
                  {selectedAlfajor.gramos != null && (
                    <span>{selectedAlfajor.gramos}g</span>
                  )}
                  {selectedAlfajor.calorias != null && (
                    <span>{selectedAlfajor.calorias} Cal</span>
                  )}
                </div>

                {selectedAlfajor.tagline && (
                  <p className="alfajor-detail-tagline">
                    <strong>{selectedAlfajor.tagline}</strong>
                  </p>
                )}

                {selectedAlfajor.descripcion && (
                  <p className="alfajor-detail-description">
                    {selectedAlfajor.descripcion}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="alfajor-detail-meta">
                  <img
                    src={`/Flags/${flagName}.webp`}
                    alt={selectedAlfajor.pais}
                    className="alfajor-detail-flag"
                  />
                  {selectedAlfajor.gramos != null && (
                    <span>{selectedAlfajor.gramos}g</span>
                  )}
                  {selectedAlfajor.calorias != null && (
                    <span>{selectedAlfajor.calorias} Cal</span>
                  )}
                </div>

                {selectedAlfajor.tagline && (
                  <p className="alfajor-detail-tagline">
                    <strong>{selectedAlfajor.tagline}</strong>
                  </p>
                )}

                {selectedAlfajor.descripcion && (
                  <p className="alfajor-detail-description">
                    {selectedAlfajor.descripcion}
                  </p>
                )}
              </>
            )}

            <div
              className={
                isMobile
                  ? "alfajor-detail-footer-mobile"
                  : "alfajor-detail-footer"
              }
            >
              <div
                className={
                  isMobile
                    ? "alfajor-detail-socials-mobile"
                    : "alfajor-detail-socials"
                }
              >
                {selectedAlfajor.website && (
                  <a
                    href={selectedAlfajor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--black)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </a>
                )}

                {selectedAlfajor.instagram && (
                  <a
                    href={`https://www.instagram.com/${selectedAlfajor.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--black)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="var(--black)" />
                    </svg>
                  </a>
                )}

                {selectedAlfajor.tiktok && (
                  <a
                    href={`https://www.tiktok.com/${selectedAlfajor.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="var(--black)"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                    </svg>
                  </a>
                )}
              </div>
              {!isMobile && (
                <AddFavoritesButton
                  active={selectedAlfajor.isFav}
                  onChange={(like) => setFavAlfajor(selectedAlfajor.id, like)}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="no-results">Alfajor no encontrado</p>
      )}
    </div>
  );
}

export default AlfajorModal;
