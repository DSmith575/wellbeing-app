export const extractAndSortItems = (items, badgeRegex) => {
  // First, sort the items by their value in descending order
  const sortedItems = Object.entries(items).sort(([, a], [, b]) => b - a); // Sort by numeric value

  // Now, map over the sorted entries and return an array of objects with key, value, and extra
  return sortedItems.map(([key, value], index) => {
    // If it's a badge, extract the event category from the key using regex
    const newKey = badgeRegex ? (key.match(/\(([^)]+)\)/) ? key.match(/\(([^)]+)\)/)[1] : key) : key;

    // Add the numeric index for the material icon
    const extraValue = `numeric-${index + 1}-box`;

    return {
      key: newKey,
      value,
      extra: extraValue,
    };
  });
};
