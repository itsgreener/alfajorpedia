function EmptyModal({ onClose, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default EmptyModal;
