/**
 * @name BadgesOrCategoriesList
 * @description This component displays a list of badges or categories.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the list.
 * @param {Array} props.data - The data to be displayed in the list.
 * @param {string} props.noDataText - The text to display when there is no data.
 * @returns {JSX.Element} - The rendered BadgesOrCategoriesList component.
 */

import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BadgesOrCategoriesList = ({ title, data, noDataText }) => {
  return (
    <View className={"flex-1 justify-center items-center"}>
      <View>
        <Text className={"text-center font-bold mb-2 text-2xl"}>{title}</Text>
        {data && data.length > 0 ? (
          data.map(({ key, value, icon, color }) => (
            <View key={key} className={"p-2 bg-sky-200 rounded-lg mb-2 flex flex-row"}>
              <MaterialCommunityIcons name={icon} size={24} color={color} />
              <Text className={"ml-0.5 pr-4 mt-0.5"}>{`${key}:`}</Text>
              <Text className={"font-bold flex ml-auto mt-0.5"}>{`${value}`}</Text>
            </View>
          ))
        ) : (
          <Text className={"text-center text-red-500"}>{noDataText}</Text>
        )}
      </View>
    </View>
  );
};

export default BadgesOrCategoriesList;
