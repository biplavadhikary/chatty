import { contactActions } from "./type";

export const fetchContacts = () => ({
  type: contactActions.FETCH_CONTACTS,
});

export const contactFetchSuccess = (payload) => ({
  type: contactActions.FETCH_SUCCESS,
  payload,
});

export const contactFetchFailed = () => ({
  type: contactActions.FETCH_FAILED,
});

export const resetContacts = () => ({
  type: contactActions.RESET_CONTACTS,
});
