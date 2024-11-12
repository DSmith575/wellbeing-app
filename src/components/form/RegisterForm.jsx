/**
 * @name RegisterForm
 * @description This component is a form that allows users to register for an account.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - Rendered component.
 */

import { View, Text, ActivityIndicator } from "react-native";
import { handleFirebaseError } from "../../utils/firestore/firestoreErrors";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import useFormInput from "../../hooks/forms/useFormInput";
import useLoading from "../../hooks/loading/useLoading";
import useError from "../../hooks/error/useError";
import { registerNewUser } from "../../utils/firestore/firestoreFunctions";
import { useNavigation } from "@react-navigation/native";
import { routerLabels } from "../../navigation/routes/routerLabels";

const RegisterForm = () => {
  const email = useFormInput("");
  const password = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");

  const { loading, setLoading } = useLoading();
  const { error, setError } = useError();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setError("signup", "");
      setLoading("signup", true);
      await registerNewUser(firstName.value, lastName.value, email.value, password.value);
      email.reset();
      password.reset();
    } catch (error) {
      setError("signup", handleFirebaseError(error));
    } finally {
      setLoading("signup", false);
    }
  };

  return (
    <View className={"flex-1 justify-center items-center"}>
      <Text className={"font-bold text-center items-center justify-center"}>Register</Text>
      <View className="w-11/12 flex items-center max-w-md border border-gray-300 rounded-lg p-5 bg-white shadow-lg">
        {error("signup") && <Text className="text-red-500">{error("signup")}</Text>}

        <Input
          label={"First Name"}
          type="text"
          placeholder="First Name..."
          required
          value={firstName.value}
          onChangeText={firstName.onChange}
          accessibilityLabel="Email address input"
          accessibilityHint="Enter your email address here"
          accessibilityRole="text"
          accessibilityState={{ disabled: false }}
        />

        <Input
          label={"Last Name"}
          type="text"
          placeholder="Last Name..."
          required
          value={lastName.value}
          onChangeText={lastName.onChange}
          accessibilityLabel="Email address input"
          accessibilityHint="Enter your email address here"
          accessibilityRole="text"
          accessibilityState={{ disabled: false }}
        />

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
          {loading("signup") ? (
            <ActivityIndicator size="small" className={"h-8"} />
          ) : (
            <Text className="text-lg text-white text-center h-8">Register</Text>
          )}
        </Button>
      </View>
      <Text className={"text-blue-500 underline mt-2"} onPress={() => navigation.navigate(routerLabels.login.name)}>
        Already have an account? Login here.
      </Text>
    </View>
  );
};

export default RegisterForm;
