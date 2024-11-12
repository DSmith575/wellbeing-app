/**
 * Renders the ExploreEvents screen.
 * @returns {JSX.Element} The rendered ExploreEvents component.
 */

import Accordion from "../../components/accordion/Accordion";
import Unauthorized from "../../components/auth/Unauthorized";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";

const ExploreEvents = () => {
  const { user } = useUserAuth();
  return (
    <>
      {user ? (
        <Accordion showRecordData={false} shouldFilterByDate={true} />
      ) : (
        <Unauthorized text={"You are not authorized to view this page"} />
      )}
    </>
  );
};

export default ExploreEvents;
