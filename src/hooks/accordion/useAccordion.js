import { useEffect, useState } from "react";
import { getEvents } from "../../utils/firestore/firestoreFunctions";
import { eventCollection } from "../../utils/constants/constants";

const useAccordion = () => {
  const [sections, setSections] = useState([]);

  const getEventData = async () => {
    try {
      return getEvents({
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

          const groupedEvents = sortedEvents.reduce((acc, event) => {
            const category = event.eventCategory;
            if (!acc[category]) {
              acc[category] = {
                title: category,
                data: [],
              };
            }
            acc[category].data.push(event);
            return acc;
          }, {});

          const sectionListData = Object.values(groupedEvents);
          setSections(sectionListData);
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
