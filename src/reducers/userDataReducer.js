import { createReducer } from "@reduxjs/toolkit";
import { userDataActions } from "../actions/type";

const initialState = {
  isAuthenticating: false,
  isLoggedIn: false,
  userId: null,
  loggedInTime: null,
  authenticationResponse: {},
  authenticationStatus: "",
};

export default createReducer(initialState, {
  [userDataActions.INITATE_LOGIN]: (state) => ({
    ...state,
    isAuthenticating: true,
  }),
  [userDataActions.AUTHENTICATION_SUCCESS]: (state, { payload }) => ({
    ...state,
    isAuthenticating: false,
    isLoggedIn: true,
    authenticationStatus: "success",
    loggedInTime: new Date(),
    authenticationResponse: payload,
  }),
  [userDataActions.AUTHENTICATION_FAILED]: (state) => ({
    ...state,
    isAuthenticating: false,
    authenticationStatus: "failed",
    authenticationResponse: null,
  }),
  [userDataActions.RESET_STATUS]: (state) => ({
    ...state,
    authenticationStatus: "",
    userId: null,
    isLoggedIn: false,
  }),
});
