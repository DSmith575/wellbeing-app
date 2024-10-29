import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import useGetAttendeesList from "../../hooks/accordion/useGetAttendeesList";

const AttendeeList = ({ attendees }) => {
  const { attendedUsers, loading } = useGetAttendeesList(attendees);
  return (
    <View>
      {loading("attendeesList") ? (
        <>
          <ActivityIndicator size={"large"} />
        </>
      ) : (
        <ScrollView>
          <Text className="text-base">
            <Text className="font-bold">
              Attended:
              <Text className="font-normal"> {attendedUsers.length}</Text>
            </Text>
          </Text>
          {attendedUsers.map((attendee) => (
            <Text className="text-base" key={`${attendee.firstName}-${attendee.lastName}`}>
              {attendee.firstName} {attendee.lastName}
            </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AttendeeList;
