import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  async function login({ email, password }) {
    setAuthLoading(true);

    try {
      const res = await fetch("https://app.alfajorpedia.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Error al iniciar sesión");
      }

      setToken(data.token);
      setUser(data.user);

      return data;
    } finally {
      setAuthLoading(false);
    }
  }

  async function register({ email, password }) {
    setAuthLoading(true);

    try {
      const res = await fetch("https://app.alfajorpedia.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Error al registrarse");
      }

      setToken(data.token);
      setUser(data.user);

      console.log(token);

      return data;
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    setToken("");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      authLoading,
      login,
      register,
      logout,
    }),
    [token, user, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthData() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthData fuera del provider");
  return ctx;
}

export function useAuthActions() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthActions fuera del provider");

  return {
    login: ctx.login,
    register: ctx.register,
    logout: ctx.logout,
  };
}