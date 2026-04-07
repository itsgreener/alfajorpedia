import { useLocation, useNavigate } from "react-router-dom";
import { useModalStack } from "../../Hooks/useModalStack";
import ProtectedPath from "../../Context/ProtectedRoute";
import FavoriteModal from "../Modals/FavoriteModal";
import SocialModal from "../Modals/SocialModal";
import styles from "./MobileFooter.module.css";

function MobileFooter() {
  const { pushModal } = useModalStack();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className={styles.mobileFooter}>
      <button
        className={styles.mobileFooterItem}
        onClick={() => pushModal(<SocialModal />)}
      >
        <img src="/vector.svg" />
        <span className={styles.mobileFooterLabel}>EXPERIENCIAS</span>
      </button>
      <button
        className={styles.mobileFooterItem}
        onClick={() =>
          pushModal(
            <ProtectedPath>
              <FavoriteModal />
            </ProtectedPath>,
          )
        }
      >
        <img src="/cor.svg" />
        <span className={styles.mobileFooterLabel}>FAVORITOS</span>
      </button>
      <button
        className={styles.mobileFooterItem}
        onClick={() =>
          location.pathname === "/"
            ? window.scrollTo({ top: 0 })
            : navigate("/")
        }
      >
        <img src="/buscar.svg" />
        <span className={styles.mobileFooterLabel}>BUSCAR</span>
      </button>
      <button
        className={styles.mobileFooterItem}
        onClick={() => (location.pathname === "/" ? navigate("/") : "")}
      >
        <img
          src="/logoAlfajorpedia.svg"
          alt="Alfajorpedia"
          className={styles.mobileFooterLogo}
        />
      </button>
    </footer>
  );
}

export default MobileFooter;
