import { View, Text } from "react-native";
import useFormInput from "../../hooks/forms/useFormInput";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import useLoading from "../../hooks/loading/useLoading";
import { useState } from "react";
import { handleFirebaseError } from "../../utils/firestore/firestoreErrors";
import { ActivityIndicator } from "react-native";

const LoginForm = () => {
  const { login } = useUserAuth();
  const email = useFormInput("");
  const password = useFormInput("");
  const { loading, setLoading } = useLoading();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading("login", true);
      await login(email.value, password.value);
      email.reset();
      password.reset();
    } catch (error) {
      setError(handleFirebaseError(error));
    } finally {
      setLoading("login", false);
    }
  };

  return (
    <View className={"flex-1 justify-center items-center"}>
      <View className="w-11/12 flex items-center max-w-md border border-gray-300 rounded-lg p-5 bg-white shadow-lg">
        {error && <Text className="text-red-500">{error}</Text>}
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
        <Button
          onPress={handleSubmit}
          text={loading("login") ? <ActivityIndicator size="small" color="#fff" /> : "Login"}
          accessibilityLabel="Login button"
          accessibilityHint="Tap to login"
          styles={"w-10/12 bg-blue-600 py-2 px-4 rounded-lg inline-flex items-center"}
        />
      </View>
    </View>
  );
};

export default LoginForm;
