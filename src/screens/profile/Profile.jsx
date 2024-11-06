/**
 * Renders the user profile screen.
 * @returns {JSX.Element} The profile screen component.
 */

import { View, Text } from "react-native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import Button from "../../components/button/Button";
import useGetUserInfo from "../../hooks/profile/useGetUserInfo";
import Spinner from "../../components/spinner/Spinner";

const Profile = () => {
  const { user, logout } = useUserAuth();
  const { userInfo, loading } = useGetUserInfo(user);

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
        <View className={"flex justify-center items-center relative"}>
          <Text className={"text-2xl text-gray-800 font-bold"}>
            {userInfo?.firstName} {userInfo?.lastName}
          </Text>
          <Button
            onPress={signOut}
            text="Logout"
            accessibilityLabel="Logout button"
            accessibilityHint="Tap to logout"
            styles={"bg-blue-400 py-2 px-4 rounded inline-flex items-center absolute top-2 right-2"}>
            <Text className="text-white">Logout</Text>
          </Button>
          <View className={"flex flex-wrap mt-2"}>
            {userInfo?.badges ? (
              Object.entries(userInfo.badges).map(([badge, level]) => (
                <View key={badge} className={"p-2 bg-sky-100 border rounded-md mr-2 mb-2"}>
                  <Text className={"text-sm"}>{`${badge}: Level ${level}`}</Text>
                </View>
              ))
            ) : (
              <Text>No badges available</Text>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;
