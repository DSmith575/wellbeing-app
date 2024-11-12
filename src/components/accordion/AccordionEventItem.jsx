/**
 * Renders an item for the accordion component.
 *
 * @param {string} iconName - The name of the MaterialCommunityIcons icon.
 * @param {string} labelText - The text to be displayed for the item.
 * @param {string} styles - The additional styles to be applied to the container view.
 * @param {string} textStyles - The additional styles to be applied to the text component.
 * @returns {JSX.Element} - The rendered AccordionEventItem component.
 */

import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AccordionEventItem = ({ iconName, labelText, styles, textStyles }) => {
  return (
    <View className={`flex flex-row items-center ${styles}`}>
      <MaterialCommunityIcons name={iconName} size={24} color="black" />
      <Text className={`font-light ml-2 ${textStyles}`} numberOfLines={1}>
        {labelText}
      </Text>
    </View>
  );
};

export default AccordionEventItem;
