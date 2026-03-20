import { useCallback, useEffect, useRef } from "react";
import { useAlfajoresActions } from "./useAlfajores.jsx";
import { useAuthData } from "./useAuth.jsx";
import { useModalStack } from "./useModalStack.js";
import ProtectedPath from "../Context/ProtectedRoute.jsx";
import AlfajorModal from "../Components/Modals/AlfajorModal.jsx";
import LoginModal from "../Components/Modals/LoginModal.jsx";

export function useSetFavorites() {
  const { toggleFavoriteAlfajor } = useAlfajoresActions();
  const { currentModal, pushModal } = useModalStack();
  const { user } = useAuthData();
  const userRef = useRef(null);
  const currentModalRef = useRef(currentModal);

  const setFavAlfajor = useCallback(
    (id, like) => {
      if (userRef.current) {
        toggleFavoriteAlfajor(id, like);
      } else {
        if (currentModalRef.current) {
          pushModal(
            <ProtectedPath>
              <AlfajorModal alfajorId={id} />
            </ProtectedPath>,
          );
        } else {
          pushModal(<LoginModal />);
        }
      }
    },
    [pushModal, toggleFavoriteAlfajor],
  );

  useEffect(() => {
    currentModalRef.current = currentModal;
  }, [currentModal]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  return { setFavAlfajor };
}
