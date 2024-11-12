/**
 * @name Records
 * @description A screen component that renders the Accordion component.
 * @returns {JSX.Element} The Records screen component.
 */

import Accordion from "../../components/accordion/Accordion";
import useGetUserInfo from "../../hooks/profile/useGetUserInfo";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import Unauthorized from "../../components/auth/Unauthorized";
import Spinner from "../../components/spinner/Spinner";

const Records = () => {
  const { user } = useUserAuth();
  const { userInfo, loading } = useGetUserInfo(user);
  return (
    <>
      {loading("userInfo") ? (
        <Spinner />
      ) : (
        <>
          {user === userInfo.userId ? (
            <Accordion showRecordData={true} shouldFilterByDate={false} />
          ) : (
            <Unauthorized text={"You are not authorized to view this page"} />
          )}
        </>
      )}
    </>
  );
};

export default Records;
