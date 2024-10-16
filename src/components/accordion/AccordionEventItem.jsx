import { View, Text } from "react-native";

const AccordionEventItem = ({ headerText, labelText }) => {
  return (
    <View>
      <Text className="text-base">
        <Text className="font-bold">{headerText}: </Text>
        {labelText}
      </Text>
    </View>
  );
};

export default AccordionEventItem;
