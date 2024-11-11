/**
 * Renders the ExploreEvents screen.
 * @returns {JSX.Element} The rendered ExploreEvents component.
 */

import Accordion from "../../components/accordion/Accordion";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";

const ExploreEvents = () => {
  const { user } = useUserAuth();
  return <>{user && <Accordion showRecordData={false} shouldFilterByDate={true} />}</>;
};

export default ExploreEvents;
