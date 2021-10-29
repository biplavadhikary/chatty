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

const userDataService = {
  fetchContactList,
  fetchConversations,
};

export default userDataService;
