import { useEffect, useState } from "react";
import { getEvents } from "../../utils/firestore/firestoreFunctions";
import { eventCollection, eventCategories } from "../../utils/constants/constants";
import useLoading from "../loading/useLoading";
import { collection, getDoc, doc } from "firebase/firestore";
import { firestore } from "../../config/firebase";

const useAccordion = (showRecordData, shouldFilterByDate) => {
  const [sections, setSections] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const { loading, setLoading } = useLoading();

  const getEventData = async () => {
    try {
      setLoading("eventData", true);
      console.log("Fetching events...");
      await getEvents({
        collectionName: eventCollection,
        callback: async (snapshot) => {
          const eventList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          let filteredEvents = eventList;

          if (shouldFilterByDate) {
            const currentDate = new Date();
            filteredEvents = eventList.filter((event) => event.eventDate.toDate() >= currentDate);
          }

          const sortedEvents = filteredEvents.sort((a, b) => a.eventDate.toDate() - b.eventDate.toDate());

          const initializedSections = eventCategories.map((category) => ({
            title: category.label,
            headerUri: category.uri,
            backgroundColor: "bg-sky-500",
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

              // Collect unique user IDs (document IDs)
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
                return userSnap.exists() ? { id: userId, ...userSnap.data() } : null; // Return data or null if not found
              });

              const userDataArray = await Promise.all(userDataPromises);
              const userData = userDataArray.filter((data) => data !== null); // Filter out null values
              console.log("Fetched User Data:", userData); // Log fetched user data
              setAttendees(userData);
            } catch (error) {
              console.error("Error fetching user data", error);
            }
          }

          setSections(initializedSections);
        },
      });
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading("eventData", false);
    }
  };

  useEffect(() => {
    console.log("useAccordion: Fetching event data...");
    getEventData();
  }, [shouldFilterByDate]);

  return { sections, attendees, loading };
};

export default useAccordion;
