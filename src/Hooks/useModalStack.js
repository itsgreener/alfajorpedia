import { useContext } from "react";
import { ModalContext } from "../Context/CreateContext.js";

export function useModalStack() {
  return useContext(ModalContext);
}
