export const generateUId = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createNewMessageItem = (text = "", senderId = "") => {
  const checkedText = text.trim();
  const messageDateTime = new Date().toString();
  const messageId = generateUId();

  return {
    dateTime: messageDateTime,
    messageId,
    isSender: true,
    message: checkedText,
    senderId,
  };
};
