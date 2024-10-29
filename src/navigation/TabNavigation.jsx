import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { routes } from "./routes/routes";
import { filterRoutes } from "./routes/filterRoutes";
import { useUserAuth } from "../context/firebase/FirestoreAuthContext";
import { useMemo } from "react";
import { routerLabels } from "./routes/routerLabels";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { user } = useUserAuth();

  const filteredRoutes = useMemo(() => filterRoutes(routes, user), [routes, user]);
  return (
    <Tab.Navigator initialRouteName="Explore Events">
      {filteredRoutes.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={{
            tabBarLabel: route.label,
            headerShown: route.name === routerLabels.login.name ? false : true,
            tabBarActiveTintColor: "cornflowerblue",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={route.icon} color={color} size={size} />,
            tabBarStyle: {
              display: route.name === routerLabels.login.name ? "none" : "block",
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
