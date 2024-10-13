import { TouchableOpacity, Text } from "react-native";

const AccessibleButton = ({ onPress, text, accessibilityLabel, accessibilityHint }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      className={"w-10/12 bg-blue-400 py-2 px-4 rounded inline-flex items-center"}>
      <Text className={"text-lg text-gray-800"}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AccessibleButton;
