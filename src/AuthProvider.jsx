import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    console.log("Login successful! " + userData.email + " is logged in.");
  };
  const logout = () => setUser(null);
  const register = (userData) =>
    console.log("Registering user: ", userData.email);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
