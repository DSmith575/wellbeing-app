/**
 * Renders a component to display a login form.
 * @name LoginForm
 * @description This component displays a login form with email and password inputs.
 * @returns {JSX.Element} - The rendered LoginForm component.
 *
 */

import { View, Text, ActivityIndicator } from "react-native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import { handleFirebaseError } from "../../utils/firestore/firestoreErrors";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import useFormInput from "../../hooks/forms/useFormInput";
import useLoading from "../../hooks/loading/useLoading";
import useError from "../../hooks/error/useError";
import { routerLabels } from "../../navigation/routes/routerLabels";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const { login } = useUserAuth();
  const email = useFormInput("");
  const password = useFormInput("");
  const { loading, setLoading } = useLoading();
  const { error, setError } = useError();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setError("login", "");
      setLoading("login", true);
      await login(email.value, password.value);
      email.reset();
      password.reset();
    } catch (error) {
      setError("login", handleFirebaseError(error));
    } finally {
      setLoading("login", false);
    }
  };

  return (
    <View className={"flex-1 justify-center items-center"}>
      <Text className={"font-bold text-center items-center justify-center"}>Login</Text>
      <View className="w-11/12 flex items-center max-w-md border border-gray-300 rounded-lg p-5 bg-white shadow-lg">
        {error("login") && <Text className="text-red-500">{error("login")}</Text>}
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
          accessibilityLabel="Login button"
          accessibilityHint="Tap to login"
          styles={"w-10/12 bg-blue-600 py-2 px-4 rounded-lg inline-flex items-center"}>
          {loading("login") ? (
            <ActivityIndicator size="small" className={"h-8"} />
          ) : (
            <Text className="text-lg text-white text-center h-8">Login</Text>
          )}
        </Button>
      </View>
      <Text className={"text-blue-500 underline mt-2"} onPress={() => navigation.navigate(routerLabels.register.name)}>
        Don't have an account? Click here to sign up!
      </Text>
    </View>
  );
};

export default LoginForm;
