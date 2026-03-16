import { useModalStack } from "../../Hooks/useModalStack";
import "./EmptyModal.css";

function EmptyModal({ onClose, children }) {
  const { popModal, stack } = useModalStack();

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {stack.length > 1 ? (
          <button
            className="modal-close hover"
            onClick={() => popModal()}
            aria-label="Atrás"
          >
            {"<"}
          </button>
        ) : (
          <button
            className="modal-close hover"
            onClick={() => onClose()}
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default EmptyModal;
