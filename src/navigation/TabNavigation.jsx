import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { routes } from './routes/routes';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      {routes.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={{
            tabBarLabel: route.label,
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={route.icon} color={color} size={size} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
