import { useContext } from "react";
import { ModalContext } from "../Context/ModalContext.js";

export function useModalStack() {
  return useContext(ModalContext);
}
