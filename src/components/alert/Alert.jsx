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
