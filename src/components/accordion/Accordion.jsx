import { View, Text, SectionList, TouchableOpacity, ImageBackground } from "react-native";
import {
  checkDate,
  convertDateTimeToLocale,
  splitDateGetTime,
  splitDateGetCalendarDate,
} from "../../utils/dateTime/dateTimeFunctions";
import AccordionEventItem from "./AccordionEventItem";
import AttendeeList from "./AttendeeList";
import useAccordion from "../../hooks/accordion/useAccordion";
import useAccordionToggle from "../../hooks/accordion/useAccordionToggle";
import Spinner from "../spinner/Spinner";
import SvgComponent from "./Scribble";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { eventRecurrence } from "../../utils/constants/constants";

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
        {/* <View style={{backgroundColor: item.colorPicker}} className={`rounded-lg p-3 my-1 mx-4 shadow-lg relative overflow-hidden flex align-middle justify-center`}> */}
        <View
          className={
            "bg-slate-200  rounded-lg p-3 my-1 mx-4 shadow-lg relative overflow-hidden flex align-middle justify-center"
          }>
          <AccordionEventItem labelText={item.eventName} styles={"text-center items-center justify-center"} />
          {showRecordData ? (
            <AttendeeList attendees={item.signedUp} />
          ) : (
            <>
              <SvgComponent width={80} height={80} strokeColor={item.colorPicker} styles={"absolute -bottom-4 -right-4"} />

              <View className={"absolute rounded-md backdrop-blur-lg top-2 left-4"}>
                <AccordionEventItem
                  labelText={splitDateGetCalendarDate(item.eventDate).date}
                  styles={"text-center items-center"}
                />
                <AccordionEventItem
                  labelText={splitDateGetCalendarDate(item.eventDate).month}
                  styles={"text-center items-center"}
                />
              </View>

              {/* <AccordionEventItem labelText={item.eventLocation} styles={"text-center items-center"} /> */}
              <View className={"flex flex-row mt-4 justify-evenly"}>
                <AccordionEventItem
                  labelText={item.groupLimit > 0 ? item.groupLimit : "No Limit"}
                  styles={""}
                  iconName={"account-group"}
                />
                <AccordionEventItem
                  labelText={item.eventRecurrence}
                  styles={""}
                  iconName={
                    item.eventRecurrence === eventRecurrence.challenge
                      ? "repeat"
                      : item.eventRecurrence === eventRecurrence.recurring
                        ? "autorenew"
                        : "calendar-check"
                  }
                />
              </View>
              {checkDate(convertDateTimeToLocale(item.eventDate)) && (
                <Text className="text-base text-red-500 items-center text-center mt-2">Event today</Text>
              )}

              <View className={"flex justify-start"}>
                <View className={"flex flex-row mb-2"}>
                  <AccordionEventItem
                    labelText={item.eventLocation}
                    styles={"text-center items-center ml-2"}
                    iconName={"map-marker-outline"}
                  />
                </View>

                <View className={"flex flex-row"}>
                  <AccordionEventItem
                    labelText={splitDateGetTime(item.eventDate)}
                    styles={"text-center items-center ml-2"}
                    iconName={"clock-outline"}
                  />
                </View>
              </View>
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
