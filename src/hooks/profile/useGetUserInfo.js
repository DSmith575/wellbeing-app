import { useState, useEffect } from "react";
import useLoading from "../loading/useLoading";
import { getFirebaseDocument } from "../../utils/firestore/firestoreFunctions";
import { userCollection } from "../../utils/constants/constants";

const useGetUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState({});
  const { loading, setLoading } = useLoading();

  const getUserInfo = async () => {
    try {
      if (!userId) {
        return;
      }

      setLoading("userInfo", true);
      const userData = await getFirebaseDocument(userCollection, userId);

      setUserInfo(userData);
    } catch (error) {
      console.error("Error getting user info", error);
    } finally {
      setLoading("userInfo", false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return { userInfo, loading };
};

export default useGetUserInfo;
