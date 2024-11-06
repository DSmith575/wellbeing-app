import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AccordionEventItem = ({ iconName, labelText, styles, textStyles }) => {
  return (
    <View className={`${styles} flex flex-row items-center text-center`}>
      <MaterialCommunityIcons name={iconName} size={24} color="black" />
      <Text className={`${textStyles} ml-2 font-light`}>{labelText} </Text>
    </View>
  );
};

export default AccordionEventItem;
