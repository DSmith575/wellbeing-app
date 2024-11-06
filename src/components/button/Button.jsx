/**
 * A custom accessible button component.
 *
 * @component
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {ReactNode} children - The content of the button.
 * @param {string} accessibilityLabel - The label for accessibility purposes.
 * @param {string} accessibilityHint - The hint for accessibility purposes.
 * @param {string} styles - The additional styles to be applied to the button.
 * @returns {JSX.Element} A TouchableOpacity component representing the accessible button.
 */

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
