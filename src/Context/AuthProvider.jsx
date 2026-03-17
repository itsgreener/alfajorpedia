import { useCallback, useState } from "react";
import { AuthDataContext, AuthActionsContext } from "./CreateContext.js";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => {
    setUser(userData);
    console.log("Login successful! " + userData.email + " is logged in.");
  }, []);
  const logout = useCallback(() => setUser(null), []);
  const register = useCallback((userData) => {
    setUser(userData);
    console.log("Registering user: ", userData.email);
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
