/**
 * A component that displays a spinner indicating loading or processing state.
 * @returns {JSX.Element} The Spinner component.
 */

import { View, ActivityIndicator } from "react-native";

const Spinner = () => {
  return (
    <View className={"flex-1 items-center justify-center"}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Spinner;
