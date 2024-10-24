import { useState, useEffect } from "react";
import useLoading from "../loading/useLoading";
import { getEvent } from "../../utils/firestore/firestoreFunctions";

const useGetAttendeesList = (attendees) => {
  const [attendedUsers, setAttendedUsers] = useState([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const getAttendeesList = async () => {
      try {
        setLoading("attendeesList", true);
        const attendeesData = await Promise.all(
          attendees.map(async (userId) => {
            const userData = await getEvent("users", userId);
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
