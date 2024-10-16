import { ScrollView, Text, View } from "react-native";

const AttendeeList = ({ attendees, signedUp }) => {
  return (
    <View>
      <Text className="text-base">
        <Text className="font-bold">Attendees: {signedUp}</Text>
      </Text>
      <ScrollView className={""}>
        {attendees.map((attendee) => (
          <Text className="text-base" key={attendee.id}>
            {attendee.firstName} {attendee.lastName}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default AttendeeList;
