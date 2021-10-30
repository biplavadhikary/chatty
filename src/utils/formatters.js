export const formatTime = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export const formatDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth()}`;
};
