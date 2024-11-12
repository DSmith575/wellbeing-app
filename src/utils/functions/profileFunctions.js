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
    const color = index === 0 ? "#ffcc00" : index === 1 ? "#838996" : index === 2 ? "#CD7F32" : "black";

    return {
      key: newKey,
      value,
      icon: icon,
      color,
    };
  });
};
