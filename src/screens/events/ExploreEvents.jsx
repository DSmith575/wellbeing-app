import { View } from "react-native";
import Accordion from "../../components/accordion/Accordion";
const ExploreEvents = () => {
  return (
    <>
      <Accordion showRecordData={false} shouldFilterByDate={true} />
    </>
  );
};

export default ExploreEvents;
