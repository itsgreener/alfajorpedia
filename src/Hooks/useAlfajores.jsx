import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthData } from "./useAuth.jsx";

const AlfajoresContext = createContext(null);

export function AlfajoresProvider({ children }) {
  const { token } = useAuthData();

  const [alfajores, setAlfajores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAlfajores() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://app.alfajorpedia.com/api/alfajores", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Error cargando alfajores");
      }

      setAlfajores(data);
    } catch (err) {
      setError(err.message || "Error cargando alfajores");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlfajores();
  }, [token]);

async function toggleFavoriteAlfajor(id, like) {
  if (!token) {
    throw new Error("No autenticado");
  }

 const targetId = Number(id);

  const res = await fetch(`https://app.alfajorpedia.com/api/favorites/${targetId}`, {
    method: like ? "POST" : "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || data.error || "Error actualizando favorito");
  }

  setAlfajores((prev) =>
    prev.map((a) =>
      Number(a.id) === targetId ? { ...a, isFav: like } : a
    )
  );
}

  const value = useMemo(
    () => ({
      alfajores,
      loading,
      error,
      fetchAlfajores,
      toggleFavoriteAlfajor,
    }),
    [alfajores, loading, error],
  );

  return (
    <AlfajoresContext.Provider value={value}>
      {children}
    </AlfajoresContext.Provider>
  );
}

export function useAlfajoresData() {
  const ctx = useContext(AlfajoresContext);
  if (!ctx) throw new Error("useAlfajoresData fuera del provider");

  return {
    alfajores: ctx.alfajores,
    loading: ctx.loading,
    error: ctx.error,
  };
}

export function useAlfajoresActions() {
  const ctx = useContext(AlfajoresContext);
  if (!ctx) throw new Error("useAlfajoresActions fuera del provider");

function alfajorById(id) {
  return ctx.alfajores.find((a) => Number(a.id) === Number(id));
}

  function favoriteAlfajores() {
    return ctx.alfajores.filter((a) => a.isFav);
  }

  return {
    alfajorById,
    favoriteAlfajores,
    fetchAlfajores: ctx.fetchAlfajores,
    toggleFavoriteAlfajor: ctx.toggleFavoriteAlfajor,
  };
}