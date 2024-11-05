import { View, Text } from "react-native";

const Unauthorized = ({ text }) => {
  return (
    <View className={"flex-1 justify-center items-center"}>
      <Text className="text-red-400 font-bold">{text}</Text>
    </View>
  );
};

export default Unauthorized;
