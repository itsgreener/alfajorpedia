import { useContext } from "react";
import { AuthDataContext, AuthActionsContext } from "../Context/CreateContext.js";

export function useAuthData() {
  return useContext(AuthDataContext);
}

export function useAuthActions() {
  return useContext(AuthActionsContext);
}
