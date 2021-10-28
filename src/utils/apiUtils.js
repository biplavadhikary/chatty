import { LOCAL_URL, PROUDCTION_URL } from "../constants/apiConstants";

export const getApiUrl = (route = "") => {
  let baseUrl = "";
  if (import.meta.env.DEV) {
    baseUrl = LOCAL_URL;
  } else {
    baseUrl = PROUDCTION_URL;
  }

  return `${baseUrl}/${route}`;
};
