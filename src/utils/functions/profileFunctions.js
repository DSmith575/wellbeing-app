/**
 * @name extractAndSortItems
 * @description This function extracts and sorts items from an object.
 * @param {Object} items - The items to be extracted and sorted.
 * @param {RegExp} badgeRegex - The regular expression to use for extracting the event category.
 * @returns {Array} The sorted items.
 */

import { badgeCategoryCounterColors } from "../constants/constants";

export const extractAndSortItems = (items, badgeRegex) => {
  // First, sort the items by their value in descending order
  const sortedItems = Object.entries(items).sort(([, a], [, b]) => b - a); // Sort by numeric value

  // Map over the sorted entries and return an array of objects with key, value, and icon for each items index value
  return sortedItems.map(([key, value], index) => {
    // If it's a badge, extract the event category from the key using regex
    const newKey = badgeRegex ? (key.match(/\(([^)]+)\)/) ? key.match(/\(([^)]+)\)/)[1] : key) : key;

    // Add the numeric index for the MaterialCommunityIcon
    const icon = index === 0 ? "star" : `numeric-${index + 1}-box`;

    // add hex color for index 0,1,2 where index value = gold,silver,bronze
    const color =
      index === 0
        ? badgeCategoryCounterColors.gold
        : index === 1
          ? badgeCategoryCounterColors.silver
          : index === 2
            ? badgeCategoryCounterColors.bronze
            : badgeCategoryCounterColors.other;

    return {
      key: newKey,
      value,
      icon: icon,
      color,
    };
  });
};
