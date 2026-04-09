import { useLocation } from "react-router-dom";
import FavoriteModal from "../Components/Modals/FavoriteModal.jsx";
import LoginModal from "../Components/Modals/LoginModal.jsx";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import { useModalStack } from "./useModalStack.js";

export const useHeaderFooterActions = () => {
  const { pushModal } = useModalStack();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const onFavoriteClick = () => {
    pushModal(
      <ProtectedPath>
        <FavoriteModal />
      </ProtectedPath>,
    );
  };

  const onSubscribeClick = () => {
    pushModal(<LoginModal />);
  };

  return {
    onFavoriteClick,
    onSubscribeClick,
    isHome,
  };
};
