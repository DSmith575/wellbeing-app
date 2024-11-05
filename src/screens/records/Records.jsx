import Accordion from "../../components/accordion/Accordion";
import useGetUserInfo from "../../hooks/profile/useGetUserInfo";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import { userRoles } from "../../utils/constants/constants";
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
          {userInfo && userInfo.role !== userRoles.admin ? (
            <Unauthorized text={"You are not authorized to view this page"} />
          ) : (
            <Accordion showRecordData={true} shouldFilterByDate={false} />
          )}
        </>
      )}
    </>
  );
};

export default Records;
