import { useModalStack } from "../../Hooks/useModalStack";
import ProtectedPath from "../../Context/ProtectedRoute";
import FavoriteModal from "../Modals/FavoriteModal";
import SocialModal from "../Modals/SocialModal";
import "./MobileFooter.css";

function MobileFooter() {
  const { pushModal } = useModalStack();

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
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <img src="/buscar.svg" />
        <span className="mobile-footer-label">BUSCAR</span>
      </button>

      <img
        src="/logoAlfajorpedia.svg"
        alt="Alfajorpedia"
        className="mobile-footer-logo"
      />
    </footer>
  );
}

export default MobileFooter;
