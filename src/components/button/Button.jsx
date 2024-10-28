import { TouchableOpacity, Text } from "react-native";

const AccessibleButton = ({ onPress, text, accessibilityLabel, accessibilityHint, styles }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      className={styles}>
      <Text className={"text-lg text-white text-center"}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AccessibleButton;
