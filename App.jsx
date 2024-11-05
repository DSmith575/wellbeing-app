import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./src/context/firebase/FirestoreAuthContext";
import useSplashScreen from "./src/hooks/splashScreen/useSplashScreen";
import Navigation from "./src/navigation/NavigationContainer";
import { View } from "react-native";

export const App = () => {
  const { isVisible, onLayoutRootView } = useSplashScreen();

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <View onLayout={onLayoutRootView} />
      <AuthContextProvider>
        <StatusBar style="auto" />
        <Navigation />
      </AuthContextProvider>
    </>
  );
};

export default App;
