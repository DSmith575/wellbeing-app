import { View, Text } from 'react-native';
import Accordion from '../../components/accordion/Accordion';

const HomeScreen = () => {
  return (
    <View className={'flex-1'}>
      <Accordion />
    </View>
  );
};

export default HomeScreen;

// {events && (
//   events.map((event) => (
//     <View key={event.id}>
//       <Text>{event.eventName}</Text>
//       <Text>{event.eventDate.toDate().toLocaleString()}</Text>
//       {/* <Text>{event.eventLocation}</Text> */}
//       <Text>{event.groupLimit || 'No limit'}</Text>
//       <Text>{event.eventRecurrence}</Text>
//       <Text>{event.eventCategory}</Text>
//     </View>
//   ))
// )}
