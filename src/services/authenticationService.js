import axios from "axios";
import { getApiUrl } from "../utils/apiUtils";

const authenticateUser = (userName, password) => {
  return axios.get(getApiUrl("authenticateUser"), {
    params: { userName, password },
  });
};

const authenticationService = {
  authenticateUser,
};

export default authenticationService;
