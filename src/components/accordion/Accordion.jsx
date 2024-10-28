import { View, Text, SectionList, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import { checkDate, convertDateTimeToLocale } from "../../utils/dateTime/dateTimeFunctions";
import AccordionEventItem from "./AccordionEventItem";
import AttendeeList from "./AttendeeList";
import useAccordion from "../../hooks/accordion/useAccordion";
import useAccordionToggle from "../../hooks/accordion/useAccordionToggle";
import Spinner from "../spinner/Spinner";

const Accordion = ({ showRecordData, shouldFilterByDate }) => {
  const { sections, loading } = useAccordion(showRecordData, shouldFilterByDate);
  const { collapsedSections, toggleSection } = useAccordionToggle(sections);

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

    return (
      <>
        <View className={"bg-slate-100 border rounded-lg p-3 my-1 mx-4 shadow-lg relative"}>
          <View className={`${item.backgroundColor} h-8 w-8 rounded-full absolute top-2 right-2`} />
          <AccordionEventItem headerText="Event" labelText={item.eventName} />
          <AccordionEventItem headerText="Date" labelText={convertDateTimeToLocale(item.eventDate)} />
          {showRecordData ? (
            <AttendeeList attendees={item.signedUp} />
          ) : (
            <View>
              <Text>{item.eventRecurrence}</Text>
              {item.groupLimit > 0 && <AccordionEventItem headerText="Group Limit" labelText={item.groupLimit} />}
              {checkDate(convertDateTimeToLocale(item.eventDate)) && <Text className="text-base text-red-500">Event today</Text>}
            </View>
          )}
        </View>
      </>
    );
  };

  return (
    <>
      {loading("eventData") ? (
        <Spinner />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      )}
    </>
  );
};

export default Accordion;
