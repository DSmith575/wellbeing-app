import { useEffect, useState } from "react";
import { getEvents } from "../../utils/firestore/firestoreFunctions";
import { eventCollection, eventCategories } from "../../utils/constants/constants";

const useAccordion = () => {
  const [sections, setSections] = useState([]);

  const getEventData = async () => {
    try {
      await getEvents({
        collectionName: eventCollection,
        callback: (snapshot) => {
          const eventList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const currentDate = new Date();

          const filteredEvents = eventList.filter((event) => {
            return event.eventDate.toDate() >= currentDate;
          });

          const sortedEvents = filteredEvents.sort((a, b) => {
            return a.eventDate.toDate() - b.eventDate.toDate();
          });

          const initializedSections = eventCategories.map((category) => ({
            title: category.label,
            headerUri: category.uri,
            // Update event creator to set color
            backgroundColor: "bg-sky-500",
            data: [],
          }));

          sortedEvents.forEach((event) => {
            const category = event.eventCategory;
            const section = initializedSections.find((sec) => sec.title === category);

            if (section) {
              section.data.push(event);
            }
          });

          setSections(initializedSections);
        },
      });
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  return sections;
};

export default useAccordion;
