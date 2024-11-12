/**
 * @name useAccordionToggle
 * @description The useAccordionToggle hook is used to manage the state of an accordion component.
 * @param {Array} sections - The sections of the accordion.
 * @returns {Object} An object containing the collapsed sections and a function to toggle a section.
 *
 */

import { useState, useEffect, useCallback } from "react";

const useAccordionToggle = (sections) => {
  const [collapsedSections, setCollapsedSections] = useState({});

  useEffect(() => {
    if (sections.length > 0) {
      const initialState = sections.reduce((acc, section) => {
        acc[section.title] = true;
        return acc;
      }, {});
      setCollapsedSections(initialState);
    }
  }, [sections]);

  const toggleSection = useCallback((title) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  return { collapsedSections, toggleSection };
};

export default useAccordionToggle;
