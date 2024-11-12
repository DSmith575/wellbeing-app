/**
 * Custom hook to fetch user information.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Object} - An object containing user information, loading state, and a reset function.
 */

import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import useLoading from "../loading/useLoading";
import { getFirebaseDocument } from "../../utils/firestore/firestoreFunctions";
import { firestoreCollections } from "../../utils/constants/constants";
import { extractAndSortItems } from "../../utils/functions/profileFunctions";

const useGetUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState({});
  const { loading, setLoading } = useLoading();
  const isFocused = useIsFocused(); // Detects if the Profile screen is focused

  const getUserInfo = async () => {
    try {
      setLoading("userInfo", true);

      // Fetch data from Firestore
      const userData = await getFirebaseDocument(firestoreCollections.users, userId);
      if (userData) {
        // Sort badges and eventRecurring categories
        const sortedBadges = extractAndSortItems(userData.badges, true);
        const sortedEventRecurrence = extractAndSortItems(userData.categories);

        const updatedUserInfo = {
          ...userData,
          categories: sortedEventRecurrence,
          badges: sortedBadges,
        };

        // Only update state if new data is different from current userInfo
        if (JSON.stringify(updatedUserInfo) !== JSON.stringify(userInfo)) {
          setUserInfo(updatedUserInfo);
        }
      }
    } catch (error) {
      console.log("getUserInfo error:", error);
    } finally {
      setLoading("userInfo", false);
    }
  };

  const reset = () => setUserInfo({});

  useEffect(() => {
    if (isFocused) {
      getUserInfo();
    }
  }, [isFocused]); // Re-run when screen is focused or userId changes

  return { userInfo, loading, reset };
};

export default useGetUserInfo;
