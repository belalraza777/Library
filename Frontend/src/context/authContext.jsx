import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, logoutUser, getCurrentUser } from "../api/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // store current user
  const [loading, setLoading] = useState(true); // loading while checking auth

  // ------------------ AUTO LOGIN ON REFRESH ------------------
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getCurrentUser();        
        setUser(res.data.data); // set user from backend
      } catch (err) {
        setUser(null); // not logged in or token invalid
      } finally {
        setLoading(false); // done checking
      }
    };

    checkUser();
  }, []);

  // ------------------ LOGIN ------------------
  const handleLogin = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      setUser(res.data.data); // set user info from backend
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async (credentials) => {
    try {
      const res = await signupUser(credentials);
      setUser(res.data.data); // set user info
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  // ------------------ LOGOUT ------------------
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
console.log(user);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignup, handleLogout }}>
      {!loading && children} {/* render app only after checking user */}
    </AuthContext.Provider>
  );
};

// ------------------ CUSTOM HOOK ------------------
export const useAuth = () => useContext(AuthContext);
