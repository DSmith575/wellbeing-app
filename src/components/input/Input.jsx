import { TextInput, View, Text } from "react-native";

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChangeText,
  minLength,
  maxLength,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  accessibilityState,
  ...props
}) => {
  return (
    <View className={"w-10/12"}>
      {label && <Text className={"block mb-2 text-sm font-medium text-slate-500"}>{label}</Text>}
      <TextInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        {...props}
        className={
          "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        }
      />
    </View>
  );
};

export default Input;
