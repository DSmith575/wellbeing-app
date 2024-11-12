/**
 * @name Spinner
 * @description The Spinner component is used to render a loading spinner.
 * @returns {JSX.Element} The rendered Spinner component.
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
