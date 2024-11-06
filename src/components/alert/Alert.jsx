/**
 * Custom alert component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the alert.
 * @param {string} props.message - The message of the alert.
 * @param {string} props.buttonText - The text for the button.
 * @param {Function} props.onTouch - The function to be called when the button is pressed.
 * @returns {void}
 */
import { Alert } from "react-native";

const customAlert = ({ title, message, buttonText, onTouch }) => {
  return Alert.alert(title, message, [
    {
      text: buttonText,
      onPress: onTouch,
    },
  ]);
};

export default customAlert;
