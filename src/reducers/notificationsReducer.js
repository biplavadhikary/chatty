import { createReducer } from "@reduxjs/toolkit";
import { notificationsActions } from "../actions/type";

const initialState = {
  isEnabled: true,
  notifications: [],
};

export default createReducer(initialState, {
  [notificationsActions.ADD_NOTIFICATION]: (
    state,
    { payload: { dataItem } }
  ) => ({
    ...state,
    notifications: [...state.notifications, dataItem],
  }),
  [notificationsActions.DELETE_NOTIFICATION]: (state, { payload: id }) => ({
    ...state,
    notifications: state.notifications.filter((item) => item.id != id),
  }),
  [notificationsActions.CLEAR_ALL_NOTIFICATIONS]: (state) => ({
    ...state,
    notifications: [],
  }),
  [notificationsActions.ENABLE_NOTIFICATIONS]: (state) => ({
    ...state,
    isEnabled: true,
  }),
  [notificationsActions.DISABLE_NOTIFICATIONS]: (state) => ({
    ...state,
    isEnabled: false,
  }),
});
