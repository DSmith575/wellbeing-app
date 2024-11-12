/**
 * @name useGetAttendeesList
 * @description A custom hook that fetches the list of attendees for an event.
 * @param {Array} attendees - The list of attendees for the event.
 * @returns {Object} An object containing the list of attendees and loading state.
 */

import { useState, useEffect } from "react";
import useLoading from "../loading/useLoading";
import { getFirebaseDocument } from "../../utils/firestore/firestoreFunctions";
import { firestoreCollections, userCollection } from "../../utils/constants/constants";

const useGetAttendeesList = (attendees) => {
  const [attendedUsers, setAttendedUsers] = useState([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const getAttendeesList = async () => {
      try {
        setLoading("attendeesList", true);
        const attendeesData = await Promise.all(
          attendees.map(async (userId) => {
            const userData = await getFirebaseDocument(firestoreCollections.users, userId);
            return userData;
          }),
        );
        setAttendedUsers(attendeesData);
      } catch (error) {
        console.error("Error getting attendees list", error);
      } finally {
        setLoading("attendeesList", false);
      }
    };

    getAttendeesList();
  }, [attendees]);

  return { attendedUsers, loading };
};

export default useGetAttendeesList;
