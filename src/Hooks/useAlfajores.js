import { useContext } from "react";
import { AlfajoresDataContext, AlfajoresActionsContext } from "../Context/CreateContext.js";

export function useAlfajoresData() {
  return useContext(AlfajoresDataContext);
}

export function useAlfajoresActions() {
  return useContext(AlfajoresActionsContext);
}
