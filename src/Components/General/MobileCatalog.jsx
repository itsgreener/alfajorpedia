import { useState } from "react";
import { useFilteredData } from "../../Hooks/useFilteredData";
import { useModalStack } from "../../Hooks/useModalStack";
import AlfajorModal from "../Modals/AlfajorModal";
import Catalog from "../Groups/Catalog";
import SearchInput from "../Groups/SearchInput";
import Newsletter from "./Newsletter";
import FavoriteModal from "../Modals/FavoriteModal";
import ProtectedPath from "../../Context/ProtectedRoute";
import LoginModal from "../Modals/LoginModal";
import Contact from "./Contact";
import "./MobileCatalog.css";

function MobileCatalog({ alfajores }) {
  const { pushModal } = useModalStack();
  const { filteredData, setSearchContent } = useFilteredData(alfajores);
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <>
      <section className="mobile-catalog-section">
        <div className="mobile-catalog-header" id="catalog">
          <SearchInput onChange={setSearchContent} />
          <button onClick={() => setBurgerOpen(true)}>
            <svg
              width="24"
              height="17"
              viewBox="0 0 24 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.33333H23M1 1H23M1 15.6667H23"
                stroke="var(--black)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mobile-catalog-content">
          <p className="title">{alfajores.length} alfajores</p>
          <Catalog
            alfajores={filteredData}
            onClick={(alfajor) =>
              pushModal(<AlfajorModal alfajorId={alfajor.id} />)
            }
            items={20}
          />
        </div>
      </section>
      {burgerOpen && (
        <div className="burger-overlay" onClick={() => setBurgerOpen(false)}>
          <div className="burger-content">
            <div className="burger-margin" onClick={(e) => e.stopPropagation()}>
              <div className="burger-header">
                <img src="/logoAlfajorpedia.svg" />
                <button
                  className="burger-close"
                  onClick={() => setBurgerOpen(false)}
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <div className="burger-body">
                <p onClick={() => setBurgerOpen(false)}>CATÁLOGO</p>
                <div className="burger-divider" />
                <p
                  onClick={() => {
                    setBurgerOpen(false);
                    pushModal(
                      <ProtectedPath>
                        <FavoriteModal />
                      </ProtectedPath>,
                    );
                  }}
                >
                  FAVORITOS
                </p>
                <div className="burger-divider" />
                <p
                  onClick={() => {
                    setBurgerOpen(false);
                    pushModal(<Contact />);
                  }}
                >
                  CONTACTO
                </p>
                <div className="burger-divider" />
                <p
                  onClick={() => {
                    setBurgerOpen(false);
                    pushModal(<LoginModal />);
                  }}
                >
                  REGÍSTRATE
                </p>
              </div>
            </div>
            <div className="burger-divider-footer" />
            <div className="burger-margin" onClick={(e) => e.stopPropagation()}>
              <Newsletter />
              <div className="burger-footer">
                <img src="logoGreener.svg" alt="logo greener" />
                <div className="burger-social">
                  <a
                    href="https://itsgreener.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M2 12h20M3.5 7h17M3.5 17h17"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="4"
                        ry="10"
                        stroke="black"
                        stroke-width="1.5"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/itsgreenerhere/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      stroke="var(--black)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="var(--white)" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/itsgreenernow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="var(--black)"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.988l4.26 5.632 4.746-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileCatalog;
