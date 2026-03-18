import { useCallback, useState } from "react";
import { AuthDataContext, AuthActionsContext } from "./CreateContext.js";


function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async ({ email, password }) => {
   
    const res = await fetch("https://app.alfajorpedia.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": "4d5tyd34rcr58xd" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    setUser(data.user);
    console.log("Login successful! " + data.user.email + " is logged in.");
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const register = useCallback(async ({ email, password }) => {
    const res = await fetch("https://app.alfajorpedia.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": "4d5tyd34rcr58xd"},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al registrarse");
    }

    setUser(data.user);
    console.log("User registered: ", data.user.email);
  }, []);

  return (
    <AuthDataContext.Provider value={{ user }}>
      <AuthActionsContext.Provider value={{ login, logout, register }}>
        {children}
      </AuthActionsContext.Provider>
    </AuthDataContext.Provider>
  );
}

export default AuthProvider;
