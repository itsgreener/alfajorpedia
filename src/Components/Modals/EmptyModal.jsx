import { useModalStack } from "../../Hooks/useModalStack";
import "./EmptyModal.css";

function EmptyModal({ children }) {
  const { stack, popModal, clearModalStack } = useModalStack();

  return (
    <div className="modal-overlay" onClick={() => clearModalStack()}>
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
            onClick={() => clearModalStack()}
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
