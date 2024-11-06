import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AccordionEventItem = ({ iconName, labelText, styles, textStyles }) => {
  return (
    <View className={`${styles} flex flex-row items-center text-center`}>
      <MaterialCommunityIcons name={iconName} size={24} color="black" />
      <Text className={`font-light ml-1 ${textStyles}`} numberOfLines={1}>
        {labelText}{" "}
      </Text>
    </View>
  );
};

export default AccordionEventItem;
