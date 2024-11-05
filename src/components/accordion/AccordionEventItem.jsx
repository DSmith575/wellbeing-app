import { View, Text } from "react-native";

const AccordionEventItem = ({ headerText, labelText, styles }) => {
  return (
    <View className={styles}>
      <Text className="text-base">
        {headerText ? (
          <Text className={"font-thin"}>
            <Text className="font-thin">{`${headerText}:`} </Text>
            {labelText}
          </Text>
        ) : (
          <Text className="font-thin">{labelText} </Text>
        )}
      </Text>
    </View>
  );
};

export default AccordionEventItem;
