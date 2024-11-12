/**
 * Renders the user profile screen.
 * @returns {JSX.Element} The profile screen component.
 */

import { View, Text } from "react-native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import Button from "../../components/button/Button";
import useGetUserInfo from "../../hooks/profile/useGetUserInfo";
import Spinner from "../../components/spinner/Spinner";
import Unauthorized from "../../components/auth/Unauthorized";
import ProfileList from "../../components/profile/ProfileList";

const Profile = () => {
  const { user, logout } = useUserAuth();
  const { userInfo, loading } = useGetUserInfo(user);

  // Add event Types to another array?

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Sign out Error", error);
    }
  };

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

                  <Button
                    onPress={signOut}
                    accessibilityLabel="Logout button"
                    accessibilityHint="Tap to logout"
                    styles={"bg-blue-500 py-2 px-4 rounded inline-flex items-center mt-1 mr-2"}>
                    <Text className="text-white">Logout</Text>
                  </Button>
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
