import { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import useAccordion from "../../hooks/accordion/useAccordion";

const Accordion = ({ showRecordData }) => {
  const { sections, attendees } = useAccordion(showRecordData);
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
        <Text className="text-black font-thin text-md py-4">{title}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );

  const renderItem = ({ item, section }) => {
    if (collapsedSections[section.title]) {
      return null;
    }

    const checkDate = (date) => {
      const currentDate = new Date().toLocaleString().split(",")[0];
      const eventDate = date.split(",")[0];
      return eventDate === currentDate;
    };

    return (
      <>
        <View className={"bg-slate-100 border rounded-lg p-3 my-1 mx-4 shadow-lg relative"}>
          {showRecordData ? (
            <View>
              <Text className="text-base">
                <Text className="font-bold">Event: </Text>
                {item.eventName}
              </Text>
              <Text className="text-base">
                <Text className="font-bold">Date: </Text>
                {item.eventDate.toDate().toLocaleString("en-NZ")}
              </Text>
              <Text className="text-base">
                <Text className="font-bold">Attendees: {item.signedUp.length}</Text>
              </Text>
              <ScrollView className={""}>
                {attendees.map((attendee) => (
                  <Text className="text-base" key={attendee.id}>
                    {attendee.firstName} {attendee.lastName}
                  </Text>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View className={`bg-slate-100 border rounded-lg p-3 my-1 mx-4 shadow-lg relative`}>
              <View className={`${item.backgroundColor} h-8 w-8 rounded-full absolute top-2 right-2`} />
              <Text className="text-base">
                <Text className="font-bold">Event: </Text>
                {item.eventName}
              </Text>
              <Text className="text-base">
                <Text className="font-bold">Date: </Text>
                {item.eventDate.toDate().toLocaleString("en-NZ")}
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
              {checkDate(item.eventDate.toDate().toLocaleString()) && <Text className="text-base text-red-500">Event today</Text>}
            </View>
          )}
        </View>
      </>
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
