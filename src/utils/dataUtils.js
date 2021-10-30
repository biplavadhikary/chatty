export const getDisplayName = (item) => {
  if (item.firstName || item.lastName)
    return `${item.firstName || ""} ${item.lastName || ""}`;
  return "Unknown Person";
};
