/**
 * Renders an accordion component that displays a list of events with collapsible sections.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.showRecordData - Determines whether to show detailed record data for each event.
 * @param {boolean} props.shouldFilterByDate - Determines whether to filter events by date.
 * @returns {JSX.Element} The rendered Accordion component.
 */

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
import { eventRecurrence } from "../../utils/constants/constants";

const Accordion = ({ showRecordData, shouldFilterByDate }) => {
  const { sections, loading } = useAccordion(showRecordData, shouldFilterByDate);
  const { collapsedSections, toggleSection } = useAccordionToggle(sections);

  const renderSectionHeader = ({ section: { title, headerUri } }) => (
    <ImageBackground source={headerUri} className="px-4 py-4 my-2 rounded-md" resizeMode="cover">
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
        {/* <View style={{backgroundColor: item.colorPicker}} className={`rounded-lg p-3 pt-1 mb-2 h-40 my-1 mx-2 relative overflow-hidden flex justify-between`}> */}
        <View
          className={`bg-slate-200 rounded-lg px-2 pb-1 pt-1 mb-2 h-40 my-1 mx-2 relative overflow-hidden flex ${showRecordData ? "" : "justify-between"}`}>
          <AccordionEventItem labelText={item.eventName} styles={"text-center"} textStyles={"font-medium text-lg w-64"} />
          <SvgComponent
            width={160}
            height={160}
            strokeColor={item.colorPicker}
            styles={"absolute -bottom-4 right-36 opacity-5"}
          />
          {showRecordData ? (
            <>
              <AccordionEventItem
                labelText={convertDateTimeToLocale(item.eventDate)}
                styles={"text-center items-center m-0 p-0"}
              />
              <AttendeeList attendees={item.signedUp} />
            </>
          ) : (
            <>
              <View className={"absolute rounded-md backdrop-blur-lg top-1 right-5 flex flex-row text-center"}>
                <AccordionEventItem
                  labelText={splitDateGetCalendarDate(item.eventDate).date}
                  iconName={"calendar-outline"}
                  styles={"text-center items-center"}
                  textStyles={"font-bold"}
                />
                <AccordionEventItem
                  labelText={splitDateGetCalendarDate(item.eventDate).month}
                  styles={"text-center items-center"}
                  textStyles={"font-bold"}
                />
              </View>

              {checkDate(convertDateTimeToLocale(item.eventDate)) && (
                <Text className="text-base text-red-500 items-center text-center mt-2 absolute top-5 right-4">Event today</Text>
              )}

              <View className={"flex flex-row justify-between"}>
                <View className={"flex"}>
                  <AccordionEventItem
                    labelText={item.eventLocation}
                    styles={"text-center items-center"}
                    iconName={"map-marker-outline"}
                  />

                  <AccordionEventItem
                    labelText={splitDateGetTime(item.eventDate)}
                    styles={"text-center items-center"}
                    iconName={"clock-outline"}
                  />
                </View>

                <View className={"flex"}>
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
