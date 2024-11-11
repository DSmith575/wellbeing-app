/**
 * Custom hook for managing accordion toggle functionality.
 *
 * @param {Array} sections - The sections of the accordion.
 * @returns {Object} - An object containing the collapsedSections state and the toggleSection function.
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
