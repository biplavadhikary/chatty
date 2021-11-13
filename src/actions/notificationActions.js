import { notificationsActions } from "./type";

export const addNotification = (id, dataItem) => ({
  type: notificationsActions.ADD_NOTIFICATION,
  payload: {
    id,
    dataItem,
  },
});

export const deleteNotification = (id) => ({
  type: notificationsActions.DELETE_NOTIFICATION,
  payload: id,
});

export const clearAllNotifications = () => ({
  type: notificationsActions.CLEAR_ALL_NOTIFICATIONS,
});

export const enableNotifications = () => ({
  type: notificationsActions.ENABLE_NOTIFICATIONS,
});

export const disableNotifications = () => ({
  type: notificationsActions.DISABLE_NOTIFICATIONS,
});
