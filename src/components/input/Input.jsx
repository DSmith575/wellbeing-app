/**
 * @name Input
 * @description The Input component is used to render a text input field.
 * @param {string} label - The label for the input.
 * @param {string} type - The type of the input.
 * @param {string} placeholder - The placeholder text for the input.
 * @param {string} value - The value of the input.
 * @param {function} onChangeText - The callback function to handle text changes.
 * @param {number} minLength - The minimum length of the input value.
 * @param {number} maxLength - The maximum length of the input value.
 * @param {string} accessibilityLabel - The accessibility label for the input.
 * @param {string} accessibilityHint - The accessibility hint for the input.
 * @param {string} accessibilityRole - The accessibility role for the input.
 * @param {object} accessibilityState - The accessibility state for the input.
 * @param {object} props - Additional props for the input component.
 * @returns {JSX.Element} - The input component.
 */

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
