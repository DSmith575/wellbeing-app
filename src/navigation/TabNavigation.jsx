/**
 * Renders the tab navigation component.
 *
 * @returns {JSX.Element} The tab navigation component.
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { routes } from "./routes/routes";
import { filterRoutes } from "./routes/filterRoutes";
import { useUserAuth } from "../context/firebase/FirestoreAuthContext";
import { useMemo } from "react";
import { routerLabels } from "./routes/routerLabels";
import LogoutButton from "../components/button/LogoutButton";

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
            headerShown: route.name === (routerLabels.login.name || routerLabels.register.name) ? false : true,
            tabBarActiveTintColor: "cornflowerblue",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={route.icon} color={color} size={size} />,
            headerRight: () => route.name === routerLabels.profile.name && <LogoutButton />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
