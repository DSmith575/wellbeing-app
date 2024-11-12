/**
 * @name ExploreEvents
 * @description A screen component that renders the Accordion component.
 * @returns {JSX.Element} The ExploreEvents screen component.
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
