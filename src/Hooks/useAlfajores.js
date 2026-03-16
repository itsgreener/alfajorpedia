import { useContext } from "react";
import { AlfajoresContext } from "../Context/AlfajoresContext.js";

export function useAlfajores() {
  return useContext(AlfajoresContext);
}
