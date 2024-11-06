/**
 * Renders the ExploreEvents screen.
 * @returns {JSX.Element} The rendered ExploreEvents component.
 */

import Accordion from "../../components/accordion/Accordion";

const ExploreEvents = () => {
  return (
    <>
      <Accordion showRecordData={false} shouldFilterByDate={true} />
    </>
  );
};

export default ExploreEvents;
