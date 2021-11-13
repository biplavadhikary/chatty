import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import conversationsReducer from "./conversationsReducer";
import notificationsReducer from "./notificationsReducer";
import userDataReducer from "./userDataReducer";

export default combineReducers({
  userData: userDataReducer,
  contactList: contactReducer,
  conversations: conversationsReducer,
  notification: notificationsReducer,
});
