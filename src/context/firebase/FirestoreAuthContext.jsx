/**
 * @desc A context provider component for user authentication using Firebase.
 * @requires createContext, useContext, useEffect, useMemo, useState from 'react'
 * @requires signOut, signInWithEmailAndPassword, onAuthStateChanged from 'firebase/auth'
 * @requires auth from '../../config/firebase'
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

const UserContext = createContext();

const useUserAuth = () => {
  return useContext(UserContext);
};

/**
 * @function AuthContextProvider
 * @desc A context provider component that manages user authentication state.
 * @param {Object} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The wrapped child components with authentication context.
 */
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * @function login
   * @desc Logs in the user with the provided email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise} A promise that resolves when the user is logged in successfully.
   */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * @function logout
   * @desc Logs out the currently authenticated user.
   * @returns {Promise} A promise that resolves when the user is logged out successfully.
   */
  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    /**
     * @function handleAuthStateChanged
     * @desc Updates the user state based on the authentication state change.
     * @param {Object} currentUser - The current authenticated user object.
     */
    const handleAuthStateChanged = (currentUser) => {
      currentUser ? setUser(currentUser.uid) : setUser(null);
    };

    return onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export { AuthContextProvider, useUserAuth };
