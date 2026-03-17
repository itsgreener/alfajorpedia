import { useCallback, useState } from "react";
import {
  AlfajoresDataContext,
  AlfajoresActionsContext,
} from "./CreateContext.js";
import { alfajoresData } from "../Assets/Data.js";

function AlfajoresProvider({ children }) {
  const [alfajores, setAlfajores] = useState(alfajoresData);

  const favoriteAlfajores = useCallback(
    () => alfajores.filter((a) => a.isFav),
    [alfajores],
  );
  const alfajorById = useCallback(
    (id) => alfajores.find((a) => a.id == id),
    [alfajores],
  );
  const toggleFavoriteAlfajor = useCallback((id, like) => {
    setAlfajores((prev) =>
      prev.map((a) => (a.id == id ? { ...a, isFav: like } : a)),
    );
  }, []);

  return (
    <AlfajoresDataContext.Provider
      value={{ alfajores }}
    >
      <AlfajoresActionsContext.Provider value={{ toggleFavoriteAlfajor, favoriteAlfajores, alfajorById }}>
        {children}
      </AlfajoresActionsContext.Provider>
    </AlfajoresDataContext.Provider>
  );
}

export default AlfajoresProvider;
