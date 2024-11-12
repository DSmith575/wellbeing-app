/**
 * Logout button component.
 * @name LogoutButton
 * @description The LogoutButton component is used to render a button that logs the user out.
 * @returns {JSX.Element} The rendered LogoutButton component.
 */

import Button from "./Button";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import { Text } from "react-native";

const LogoutButton = () => {
  const { logout } = useUserAuth();

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Sign out Error", error);
    }
  };

  return (
    <Button
      onPress={signOut}
      accessibilityLabel="Logout button"
      accessibilityHint="Tap to logout"
      styles={"py-2 px-4 rounded inline-flex items-center mr-2"}>
      <Text className="text-blue-500 text-xl text-center">Logout</Text>
    </Button>
  );
};

export default LogoutButton;
