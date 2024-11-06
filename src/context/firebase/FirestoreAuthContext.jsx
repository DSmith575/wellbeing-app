import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

const UserContext = createContext();

const useUserAuth = () => {
  return useContext(UserContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser.uid) : setUser(null);
    });
  }, []);

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export { AuthContextProvider, useUserAuth };
