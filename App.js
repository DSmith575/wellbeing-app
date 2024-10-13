import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import Navigation from "./src/navigation/NavigationContainer";
import { AuthContextProvider } from "./src/context/firebase/FirestoreAuthContext";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <StatusBar style="auto" />
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
