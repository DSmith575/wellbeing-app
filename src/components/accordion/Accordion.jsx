import { View, Text, SectionList, TouchableOpacity, ImageBackground } from "react-native";
import { checkDate, convertDateTimeToLocale } from "../../utils/dateTime/dateTimeFunctions";
import AccordionEventItem from "./AccordionEventItem";
import AttendeeList from "./AttendeeList";
import useAccordion from "../../hooks/accordion/useAccordion";
import useAccordionToggle from "../../hooks/accordion/useAccordionToggle";
import Spinner from "../spinner/Spinner";
import SvgComponent from "./Scribble";

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
        <View className={"bg-slate-50 rounded-lg p-3 my-1 mx-4 shadow-lg relative overflow-hidden"}>
          <AccordionEventItem labelText={item.eventName} styles={"text-center items-center"} />
          {showRecordData ? (
            <AttendeeList attendees={item.signedUp} />
          ) : (
            <>
              <SvgComponent
                width={80}
                height={80}
                strokeColor={item.colorPicker}
                styles={"absolute -bottom-4 -left-4 rotate-180 scale-y-[-1]"}
              />
              <SvgComponent width={80} height={80} strokeColor={item.colorPicker} styles={"absolute -bottom-4 -right-4"} />
              <AccordionEventItem labelText={convertDateTimeToLocale(item.eventDate)} styles={"text-center items-center"} />
              <AccordionEventItem labelText={item.eventLocation} styles={"text-center items-center"} />
              <View className={"flex flex-row mt-4 justify-evenly"}>
                {item.groupLimit > 0 && (
                  <AccordionEventItem headerText={"Group"} labelText={item.groupLimit} styles={"col-start-3 row-start-2"} />
                )}
                <AccordionEventItem labelText={item.eventRecurrence} styles={""} />
              </View>
              {checkDate(convertDateTimeToLocale(item.eventDate)) && (
                <Text className="text-base text-red-500 items-center text-center mt-2">Event today</Text>
              )}
            </>
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
