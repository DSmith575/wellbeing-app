/**
 * Custom hook for managing accordion functionality.
 *
 * @param {boolean} showRecordData - Flag indicating whether to show record data.
 * @param {boolean} shouldFilterByDate - Flag indicating whether to filter events by date.
 * @returns {object} - Object containing sections and loading state.
 */
import { useEffect, useState } from "react";
import { getEvents, queryUserJoinedEvents } from "../../utils/firestore/firestoreFunctions";
import { eventCategories, firestoreCollections } from "../../utils/constants/constants";
import { getCurrentDateTime, filteredEvents, sortedDates } from "../../utils/dateTime/dateTimeFunctions";
import useLoading from "../loading/useLoading";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused hook

const useAccordion = (user, showRecordData, shouldFilterByDate) => {
  const [sections, setSections] = useState([]);
  const { loading, setLoading } = useLoading();
  const isFocused = useIsFocused(); // Track screen focus status

  const getEventData = async () => {
    try {
      setLoading("eventData", true);
      getEvents({
        collectionName: firestoreCollections.events,
        callback: async (snapshot) => {
          const eventList =
            snapshot?.docs?.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) || [];

          let filterEvents = eventList;
          let userRecords = [];

          if (shouldFilterByDate) {
            const currentDate = getCurrentDateTime();
            filterEvents = filteredEvents(eventList, currentDate);
          }

          if (showRecordData) {
            userRecords = await queryUserJoinedEvents(firestoreCollections.events, user);
          }

          const sortedEvents = showRecordData ? userRecords : sortedDates(filterEvents);

          const initializedSections = eventCategories.map((category) => ({
            title: category.label,
            headerUri: category.uri,
            data: [],
          }));

          sortedEvents.forEach((event) => {
            const category = event?.eventCategory;
            if (category) {
              const section = initializedSections.find((sec) => sec.title === category);
              if (section) {
                section.data = section.data.concat({ ...event });
              }
            }
          });

          // Prevent unnecessary state update if sections haven't changed
          if (JSON.stringify(initializedSections) !== JSON.stringify(sections)) {
            setSections(initializedSections);
          }

          setLoading("eventData", false);
        },
      });
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getEventData(); // Fetch data when screen is focused
    }
  }, [isFocused]); // Re-fetch on focus or when filter changes

  return { sections, loading };
};

export default useAccordion;
