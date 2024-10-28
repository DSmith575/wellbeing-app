import { TouchableOpacity } from "react-native";

const AccessibleButton = ({ onPress, children, accessibilityLabel, accessibilityHint, styles }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      className={styles}>
      {children}
    </TouchableOpacity>
  );
};

export default AccessibleButton;
