import { userDataActions } from "./type";

export const initiateAuthentication = () => ({
  type: userDataActions.INITATE_LOGIN,
});

export const authenticationSuccess = (payload) => ({
  type: userDataActions.AUTHENTICATION_SUCCESS,
  payload,
});

export const authenticationFailed = () => ({
  type: userDataActions.AUTHENTICATION_FAILED,
});

export const resetAuthenticationStatus = () => ({
  type: userDataActions.RESET_STATUS,
});

export const createSocket = (socket) => ({
  type: userDataActions.CREATE_SOCKET,
  payload: socket,
});

export const resetSocketConnection = () => ({
  type: userDataActions.RESET_SOCKET,
});

export const disconnectSocketConnection = () => ({
  type: userDataActions.DISCONNECT_SOCKET,
});
