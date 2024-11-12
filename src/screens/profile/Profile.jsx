/**
 * @name Profile
 * @description A screen component that renders the user's profile information.
 * @returns {JSX.Element} The Profile screen component.
 */

import { View, Text } from "react-native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import useGetUserInfo from "../../hooks/profile/useGetUserInfo";
import Spinner from "../../components/spinner/Spinner";
import Unauthorized from "../../components/auth/Unauthorized";
import ProfileList from "../../components/profile/ProfileList";

const Profile = () => {
  const { user } = useUserAuth();
  const { userInfo, loading } = useGetUserInfo(user);

  return (
    <>
      {loading("userInfo") ? (
        <Spinner />
      ) : (
        <>
          {user === userInfo.userId ? (
            <>
              <View className={"flex-1"}>
                <View className={"flex flex-row justify-between"}>
                  <Text className={"text-2xl text-slate-500 font-bold text-center ml-2"}>
                    {userInfo?.firstName} {userInfo?.lastName}
                  </Text>
                </View>

                <View className={"flex-1"}>
                  <ProfileList title={"Events Attended:"} data={userInfo?.badges} noDataText={"No Events Attended"} />
                  <ProfileList title={"Categories Attended:"} data={userInfo?.categories} noDataText={"No Events Attended"} />
                </View>
              </View>
            </>
          ) : (
            <Unauthorized text={"You are not authorized to view this page"} />
          )}
        </>
      )}
    </>
  );
};

export default Profile;
