import { useState, useEffect } from "react";
import useLoading from "../loading/useLoading";
import { getFirebaseDocument } from "../../utils/firestore/firestoreFunctions";

const useGetUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState({});
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading("userInfo", true);
        const userData = await getFirebaseDocument("users", userId);

        setUserInfo(userData);
      } catch (error) {
        console.error("Error getting user info", error);
      } finally {
        setLoading("userInfo", false);
      }
    };
    getUserInfo();
  }, []);

  return { userInfo, loading };
};

export default useGetUserInfo;
