import { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableOpacity, ImageBackground } from "react-native";
import useAccordion from "../../hooks/accordion/useAccordion";

const Accordion = () => {
  const sections = useAccordion();
  const [collapsedSections, setCollapsedSections] = useState({});

  useEffect(() => {
    if (sections.length > 0) {
      const initialState = sections.reduce((acc, section) => {
        if (collapsedSections[section.title] === undefined) {
          acc[section.title] = true;
        }
        return acc;
      }, {});
      setCollapsedSections((prevState) => ({ ...prevState, ...initialState }));
    }
  }, [sections]);

  const toggleSection = (title) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderSectionHeader = ({ section: { title, backgroundColor, headerUri } }) => (
    <ImageBackground source={headerUri} className="px-4 py-4 my-2 rounded-md mx-4" resizeMode="cover">
      <TouchableOpacity onPress={() => toggleSection(title)} className={""}>
        <Text className="text-black font-bold text-md p-4">{title}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );

  const renderItem = ({ item, section }) => {
    if (collapsedSections[section.title]) {
      return null;
    }

    return (
      <View className="bg-white border rounded-lg p-4 my-1 mx-4 shadow-lg">
        <Text className="text-base">
          <Text className="font-bold">Event: </Text>
          {item.eventName}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Date: </Text>
          {item.eventDate.toDate().toLocaleString()}
        </Text>
        <Text>{item.eventRecurrence}</Text>
        {item.groupLimit > 0 ? (
          <Text className="text-base">
            <Text className="font-bold">Group Limit: </Text>
            <Text>
              {item.signedUp.length} / {item.groupLimit}
            </Text>
          </Text>
        ) : (
          <Text className="text-base">
            <Text className="font-bold">Group Limit: </Text>
            <Text className="text-base">No Limit</Text>
          </Text>
        )}
      </View>
    );
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export default Accordion;
