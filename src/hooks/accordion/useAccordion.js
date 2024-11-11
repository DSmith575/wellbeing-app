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

const useAccordion = (user, showRecordData, shouldFilterByDate) => {
  const [sections, setSections] = useState([]);
  const { loading, setLoading } = useLoading();

  const getEventData = async () => {
    try {
      setLoading("eventData", true);

      await getEvents({
        collectionName: firestoreCollections.events,
        callback: async (snapshot) => {
          const eventList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          let filterEvents = eventList;

          if (shouldFilterByDate) {
            const currentDate = getCurrentDateTime();
            filterEvents = filteredEvents(eventList, currentDate);
          }

          const userRecords = await queryUserJoinedEvents(firestoreCollections.events, user);

          const sortedEvents = showRecordData ? userRecords : sortedDates(filterEvents);

          const initializedSections = eventCategories.map((category) => ({
            title: category.label,
            headerUri: category.uri,
            data: [],
          }));

          sortedEvents.forEach((event) => {
            const category = event.eventCategory;
            const section = initializedSections.find((sec) => sec.title === category);

            if (section) {
              section.data.push({
                ...event,
              });
            }
          });

          setSections(initializedSections);
          // Putting this loading in a finally causes the spinner to never show
          setLoading("eventData", false);
        },
      });
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    getEventData();
  }, [shouldFilterByDate]);

  return { sections, loading };
};

export default useAccordion;
