import { useCallback, useState } from "react";
import { ModalContext } from "./CreateContext.js";

function ModalProvider({ children }) {
  const [stack, setStack] = useState([]);

  const pushModal = useCallback(
    (modal) => setStack((prev) => [...prev, modal]),
    [],
  );
  const popModal = useCallback(() => setStack((prev) => prev.slice(0, -1)), []);
  const clearModalStack = useCallback(() => setStack([]), []);

  return (
    <ModalContext.Provider
      value={{ stack, pushModal, popModal, clearModalStack }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
