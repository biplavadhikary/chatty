import {
  LOCAL_SOCKET_URL,
  PROUDCTION_SOCKET_URL,
} from "../constants/socketConstants";

export const getChatSocket = () => {
  let baseUrl = "";
  if (import.meta.env.DEV) {
    baseUrl = LOCAL_SOCKET_URL;
  } else {
    baseUrl = PROUDCTION_SOCKET_URL;
  }

  return `${baseUrl}`;
};
