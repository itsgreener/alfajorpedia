import { useState } from "react";
import { ModalContext } from "./ModalContext.js";

function ModalProvider({ children }) {
  const [stack, setStack] = useState([]);

  const pushModal = (modal) => setStack((prev) => [...prev, modal]);
  const popModal = () => setStack((prev) => prev.slice(0, -1));
  const clearModalStack = () => setStack([]);

  console.log(stack, stack[stack.length - 1]);

  return (
    <ModalContext.Provider
      value={{
        stack,
        pushModal,
        popModal,
        clearModalStack,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
