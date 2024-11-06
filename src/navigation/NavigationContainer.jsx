/**
 * Renders the main navigation container for the app.
 * @returns {JSX.Element} The rendered navigation container.
 */

import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
