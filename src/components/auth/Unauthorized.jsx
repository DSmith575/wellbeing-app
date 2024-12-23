/**
 * @name Unauthorized
 * @description The Unauthorized component displays an error message when a user is not authorized.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display.
 * @returns {JSX.Element} - The rendered Unauthorized component.
 */

import { View, Text } from "react-native";

const Unauthorized = ({ text }) => {
  return (
    <View className={"flex-1 justify-center items-center"}>
      <Text className="text-red-400 font-bold">{text}</Text>
    </View>
  );
};

export default Unauthorized;
