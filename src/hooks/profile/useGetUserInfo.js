import { useState, useEffect } from "react";
import useLoading from "../loading/useLoading";
import { getFirebaseDocument } from "../../utils/firestore/firestoreFunctions";
import { userCollection } from "../../utils/constants/constants";

const useGetUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState({});
  const { loading, setLoading } = useLoading();

  const getUserInfo = async () => {
    try {
      setLoading("userInfo", true);

      const userData = await getFirebaseDocument(userCollection, userId);
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
