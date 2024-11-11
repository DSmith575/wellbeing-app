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
import { LinearGradient } from "expo-linear-gradient";

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
import { findEventRecurrenceIcon } from "../../utils/accordion/accordionIcons";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";

const Accordion = ({ showRecordData, shouldFilterByDate }) => {
  const { user } = useUserAuth();
  const { sections, loading } = useAccordion(user, showRecordData, shouldFilterByDate);
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
        <LinearGradient
          colors={item.eventColor}
          end={{ x: 0.1, y: 1 }}
          className={`bg-gradient-to-tr from-teal-300 to-cyan-300 rounded-lg p-3 pt-1 mb-2 h-40 my-1 mx-2 overflow-hidden flex justify-between`}>
          <View className={"flex flex-row justify-between"}>
            <AccordionEventItem labelText={item.eventName} styles={""} textStyles={"font-medium text-lg w-64 justify-start"} />

            <AccordionEventItem
              labelText={`${splitDateGetCalendarDate(item.eventDate).date} ${splitDateGetCalendarDate(item.eventDate).month}`}
              iconName={"calendar-outline"}
              styles={"items-center justify-end"}
              textStyles={"font-bold items-center"}
            />
          </View>
          <SvgComponent
            width={160}
            height={160}
            strokeColor={item.colorPicker}
            styles={"absolute -bottom-4 right-24 opacity-5 rotate-90"}
          />

          <View className={"flex flex-row"}>
            {checkDate(convertDateTimeToLocale(item.eventDate)) && (
              <AccordionEventItem
                labelText={"EVENT TODAY"}
                styles={"text-center items-center"}
                textStyles={"text-red-500 font-bold"}
                iconName={"alert-box-outline"}
              />
            )}
          </View>

          <View className={"flex flex-row justify-between"}>
            <View className={"flex"}>
              <AccordionEventItem labelText={item.eventLocation} iconName={"map-marker-outline"} />
              <AccordionEventItem labelText={splitDateGetTime(item.eventDate)} iconName={"clock-outline"} />
            </View>

            <View className={"flex"}>
              <AccordionEventItem labelText={item.groupLimit > 0 ? item.groupLimit : "No Limit"} iconName={"account-group"} />
              <AccordionEventItem labelText={item.eventRecurrence} iconName={findEventRecurrenceIcon(item.eventRecurrence)} />
            </View>
          </View>
        </LinearGradient>
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
