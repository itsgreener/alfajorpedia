import { useBreakpoint } from "../../Hooks/useBreakpoint";
import { useModalStack } from "../../Hooks/useModalStack";
import styles from "./EmptyModal.module.css";

function EmptyModal({ children }) {
  const { stack, popModal, clearModalStack } = useModalStack();
  const { isMobile } = useBreakpoint();

  return (
    <div className={styles.modalOverlay} onClick={() => clearModalStack()}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {stack.length > 1 ? (
          <button
            className={isMobile ? `${styles.mobileModalClose} hover` : `${styles.modalClose} hover`}
            onClick={() => popModal()}
            aria-label="Atrás"
          >
            {"<"}
          </button>
        ) : (
          <button
            className={isMobile ? `${styles.mobileModalClose} hover` : `${styles.modalClose} hover`}
            onClick={() => clearModalStack()}
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}

export default EmptyModal;
