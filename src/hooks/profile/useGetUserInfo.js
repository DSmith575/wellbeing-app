/**
 * Custom hook to fetch user information.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Object} - An object containing user information, loading state, and a reset function.
 */

import { useState, useEffect } from "react";
import useLoading from "../loading/useLoading";
import { getFirebaseDocument } from "../../utils/firestore/firestoreFunctions";
import { firestoreCollections, userCollection } from "../../utils/constants/constants";

const useGetUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState({});
  const { loading, setLoading } = useLoading();

  const getUserInfo = async () => {
    try {
      setLoading("userInfo", true);

      const userData = await getFirebaseDocument(firestoreCollections.users, userId);
      setUserInfo(userData);
    } catch (error) {
      console.log("getUserInfo", error);
    } finally {
      setLoading("userInfo", false);
    }
  };

  const reset = () => {
    return setUserInfo({});
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return { userInfo, loading, reset };
};

export default useGetUserInfo;
