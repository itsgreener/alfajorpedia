import { useState } from "react";
import { AlfajoresContext } from "./AlfajoresContext.js";
import { alfajoresData } from "../Assets/Data.js";

function AlfajoresProvider({ children }) {
  const [alfajores, setAlfajores] = useState(alfajoresData);

  const favoriteAlfajores = alfajores.filter((a) => a.isFav);

  const alfajorById = (id) => alfajores.find((a) => a.id == id);

  const toggleFavoriteAlfajor = (id, like) => {
    setAlfajores((prev) =>
      prev.map((a) => (a.id == id ? { ...a, isFav: like } : a)),
    );
  };

  return (
    <AlfajoresContext.Provider value={{ alfajores, favoriteAlfajores, alfajorById, toggleFavoriteAlfajor }}>
      {children}
    </AlfajoresContext.Provider>
  );
}

export default AlfajoresProvider;
