import { useState, useEffect } from "react";

const useAccordionToggle = (sections) => {
  const [collapsedSections, setCollapsedSections] = useState({});

  useEffect(() => {
    if (sections.length > 0) {
      const initialState = sections.reduce((acc, section) => {
        acc[section.title] = false;
        return acc;
      }, {});
      setCollapsedSections(initialState);
    }
  }, [sections]);

  const toggleSection = (title) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return { collapsedSections, toggleSection };
};

export default useAccordionToggle;
