import { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import useAccordionHeaders from '../../hooks/accordion/useAccordionHeaders';

const Accordion = () => {
  const sections = useAccordionHeaders();
  const [collapsedSections, setCollapsedSections] = useState({});

  useEffect(() => {
    if (sections.length > 0) {
      const initialState = sections.reduce((acc, section) => {
        // Initialize collapsed state only if not already set
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

  const renderSectionHeader = ({ section: { title } }) => (
    <TouchableOpacity onPress={() => toggleSection(title)} className={'bg-blue-500 px-4 py-4 my-2 rounded-full mx-4'}>
      <Text className="text-white font-bold text-md">{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, section }) => {
    if (collapsedSections[section.title]) {
      return null;
    }

    return (
      <View className="bg-white border rounded-lg p-4 m-2 shadow-lg">
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
