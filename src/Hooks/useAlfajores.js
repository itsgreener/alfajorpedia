import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthData } from "./useAuth.js";

const AlfajoresContext = createContext(null);

export function AlfajoresProvider({ children }) {
  const { token, user } = useAuthData();

  const [alfajores, setAlfajores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAlfajores() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://alfajorpedia.com/api/alfajores", {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error cargando alfajores");
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
  }, [token, user]);

  async function toggleFavoriteAlfajor(id, like) {
    if (!token) {
      throw new Error("No autenticado");
    }

    const method = like ? "POST" : "DELETE";

    const res = await fetch(`https://alfajorpedia.com/api/favorites/${id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Error actualizando favorito");
    }

    setAlfajores((prev) =>
      prev.map((alfajor) =>
        alfajor.id === id ? { ...alfajor, isFav: like } : alfajor,
      ),
    );
  }

  const value = useMemo(
    () => ({
      alfajores,
      loading,
      error,
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
    return ctx.alfajores.find((a) => a.id === id);
  }

  function favoriteAlfajores() {
    return ctx.alfajores.filter((a) => a.isFav);
  }

  return {
    alfajorById,
    favoriteAlfajores,
    toggleFavoriteAlfajor: ctx.toggleFavoriteAlfajor,
  };
}