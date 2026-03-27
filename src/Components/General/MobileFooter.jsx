import { useLocation, useNavigate } from "react-router-dom";
import { useModalStack } from "../../Hooks/useModalStack";
import ProtectedPath from "../../Context/ProtectedRoute";
import FavoriteModal from "../Modals/FavoriteModal";
import SocialModal from "../Modals/SocialModal";

import "./MobileFooter.css";

function MobileFooter() {
  const { pushModal } = useModalStack();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="mobile-footer">
      <button
        className="mobile-footer-item"
        onClick={() => pushModal(<SocialModal />)}
      >
        <img src="/vector.svg" />
        <span className="mobile-footer-label">EXPERIENCIAS</span>
      </button>
      <button
        className="mobile-footer-item"
        onClick={() =>
          pushModal(
            <ProtectedPath>
              <FavoriteModal />
            </ProtectedPath>,
          )
        }
      >
        <img src="/cor.svg" />
        <span className="mobile-footer-label">FAVORITOS</span>
      </button>
      <button
        className="mobile-footer-item"
        onClick={() =>
          location.pathname === "/"
            ? window.scrollTo({ top: 0 })
            : navigate("/")
        }
      >
        <img src="/buscar.svg" />
        <span className="mobile-footer-label">BUSCAR</span>
      </button>
      <button
        className="mobile-footer-item"
        onClick={() => (location.pathname === "/" ? navigate("/") : "")}
      >
        <img
          src="/logoAlfajorpedia.svg"
          alt="Alfajorpedia"
          className="mobile-footer-logo"
        />
      </button>
    </footer>
  );
}

export default MobileFooter;
