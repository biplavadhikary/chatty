import { createReducer } from "@reduxjs/toolkit";
import { contactActions } from "../actions/type";

const initialState = {
  loading: false,
  list: null,
  error: false,
};

export default createReducer(initialState, {
  [contactActions.FETCH_CONTACTS]: (state) => ({
    ...state,
    loading: true,
  }),
  [contactActions.FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    list: payload,
  }),
  [contactActions.FETCH_FAILED]: (state) => ({
    ...state,
    error: true,
  }),
  [contactActions.RESET_CONTACTS]: () => ({
    ...initialState,
  }),
});
