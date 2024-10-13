import { View } from "react-native";
import useFormInput from "../../hooks/forms/useFormInput";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";

const LoginForm = () => {
  const { login } = useUserAuth();
  const email = useFormInput("");
  const password = useFormInput("");

  const handleSubmit = () => {
    login(email.value, password.value);
  };

  return (
    <View className={"flex-1 justify-center items-center"}>
      <Input
        label={"Email"}
        type="email"
        placeholder="Enter Email"
        required
        value={email.value}
        onChangeText={email.onChange}
        accessibilityLabel="Email address input"
        accessibilityHint="Enter your email address here"
        accessibilityRole="text"
        accessibilityState={{ disabled: false }}
      />

      <Input
        label={"Password"}
        type="password"
        placeholder="Enter Password"
        required
        value={password.value}
        onChangeText={password.onChange}
        minLength={6}
        maxLength={12}
        accessibilityLabel="Password input"
        accessibilityHint="Enter your password here"
        accessibilityRole="text"
        accessibilityState={{ disabled: false }}
        secureTextEntry
      />
      <Button onPress={handleSubmit} text="Login" accessibilityLabel="Login button" accessibilityHint="Tap to login" />
    </View>
  );
};

export default LoginForm;
