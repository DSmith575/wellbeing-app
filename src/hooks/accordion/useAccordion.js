import { useEffect, useState } from "react";
import { getEvents } from "../../utils/firestore/firestoreFunctions";
import { collection, getDoc, doc } from "firebase/firestore";
import { eventCollection, eventCategories } from "../../utils/constants/constants";
import { firestore } from "../../config/firebase";
import { getCurrentDateTime, filteredEvents, sortedDates } from "../../utils/dateTime/dateTimeFunctions";
import useLoading from "../loading/useLoading";

const useAccordion = (showRecordData, shouldFilterByDate) => {
  const [sections, setSections] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const { loading, setLoading } = useLoading();

  const getEventData = async () => {
    try {
      setLoading("eventData", true);

      await getEvents({
        collectionName: eventCollection,
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

          const sortedEvents = sortedDates(filterEvents);

          const initializedSections = eventCategories.map((category) => ({
            title: category.label,
            headerUri: category.uri,
            backgroundColor: "bg-black",
            data: [],
          }));

          const userIdSet = new Set();

          sortedEvents.forEach((event) => {
            const category = event.eventCategory;
            const section = initializedSections.find((sec) => sec.title === category);

            if (section) {
              section.data.push({
                ...event,
                backgroundColor: "bg-sky-300",
              });

              event.signedUp.forEach((userId) => userIdSet.add(userId));
            }
          });

          if (showRecordData && userIdSet.size > 0) {
            const userIdsArray = Array.from(userIdSet);
            try {
              const userRef = collection(firestore, "users");
              const userDataPromises = userIdsArray.map(async (userId) => {
                const userDoc = doc(userRef, userId);
                const userSnap = await getDoc(userDoc);
                return userSnap.exists() ? { id: userId, ...userSnap.data() } : null;
              });

              const userDataArray = await Promise.all(userDataPromises);
              const userData = userDataArray.filter((data) => data !== null);
              console.log("Fetched User Data:", userData);
              setAttendees(userData);
            } catch (error) {
              console.error("Error fetching user data", error);
            }
          }

          setSections(initializedSections);
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

  return { sections, attendees, loading };
};

export default useAccordion;
