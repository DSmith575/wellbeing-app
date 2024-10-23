import { StatusBar } from "expo-status-bar";
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
