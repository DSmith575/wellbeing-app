/**
 * @name NavigationContainer
 * @description This component wraps the entire application in a NavigationContainer.
 * @returns {JSX.Element} - The rendered NavigationContainer component.
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
