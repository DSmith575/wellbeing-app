import { useEffect, useState } from 'react';
import { getEvents } from '../../utils/firestore/firestoreFunctions';

const useAccordionHeaders = () => {
  const [sections, setSections] = useState([]);

  const getEventData = async () => {
    try {
      return getEvents({
        collectionName: 'events',
        callback: (snapshot) => {
          const eventList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const groupedEvents = eventList.reduce((acc, event) => {
            const category = event.eventCategory;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(event);
            return acc;
          }, {});

          const sectionsData = Object.keys(groupedEvents).map((category) => ({
            title: category,
            data: groupedEvents[category],
          }));

          setSections(sectionsData);
        },
      });
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  return sections;
};

export default useAccordionHeaders;
