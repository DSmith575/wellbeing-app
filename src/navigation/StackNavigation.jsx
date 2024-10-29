import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import { useUserAuth } from "../context/firebase/FirestoreAuthContext";
import { routerLabels } from "./routes/routerLabels";
import Login from "../screens/auth/Login";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user } = useUserAuth();
  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name={routerLabels.login.name}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={routerLabels.home.name}
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
