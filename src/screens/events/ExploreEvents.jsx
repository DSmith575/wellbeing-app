import { View, Text } from "react-native";
import Accordion from "../../components/accordion/Accordion";
import useLoading from "../../hooks/loading/useLoading";
const ExploreEvents = () => {
  const { loading } = useLoading();
  return (
    <>
      {loading("eventData") && <Text>Loading...</Text>}
      <View className={"flex-1"}>
        <Accordion showRecordData={false} shouldFilterByDate={true} />
      </View>
    </>
  );
};

export default ExploreEvents;
