import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./StackNavigation";
import TabNavigation from "./TabNavigation";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigation/> */}
      <TabNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
