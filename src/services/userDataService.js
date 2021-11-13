import axios from "axios";
import { getApiUrl } from "../utils/apiUtils";

const fetchContactList = (userId) => {
  return axios.get(getApiUrl("fetchContactList"), {
    params: { userId },
  });
};

const fetchConversations = (userId) => {
  return axios.get(getApiUrl("fetchConversations"), {
    params: { userId },
  });
};

const getSystemDetails = (data) => {
  return axios.get(getApiUrl("getSystemDetails"), {
    params: data,
  });
};

const userDataService = {
  fetchContactList,
  fetchConversations,
  getSystemDetails,
};

export default userDataService;
