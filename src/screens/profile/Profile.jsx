import { View, Text, ActivityIndicator } from "react-native";
import LoginForm from "../../components/form/LoginForm";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import Button from "../../components/button/Button";
import useGetUserInfo from "../../hooks/profile/useGetUserInfo";

const Profile = () => {
  const { user, logout } = useUserAuth();
  const { userInfo, loading } = useGetUserInfo(user);

  return (
    <>
      {user ? (
        loading("userInfo") ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View className={"flex justify-center items-center relative"}>
            <Text className={"text-2xl text-gray-800 font-bold"}>Welcome {userInfo?.firstName}</Text>
            <Button
              onPress={logout}
              text="Logout"
              accessibilityLabel="Logout button"
              accessibilityHint="Tap to logout"
              styles={"bg-blue-400 py-2 px-4 rounded inline-flex items-center absolute top-4 right-4"}
            />
          </View>
        )
      ) : (
        <LoginForm />
      )}
    </>
  );
};
export default Profile;
