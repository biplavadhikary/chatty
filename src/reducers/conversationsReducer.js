import { createReducer } from "@reduxjs/toolkit";
import { contactActions, conversationActions } from "../actions/type";

const initialState = {
  loading: false,
  conversationItems: null,
  error: false,
};

export default createReducer(initialState, {
  [conversationActions.FETCH_ALL_CONVERSATIONS]: (state) => ({
    ...state,
    loading: true,
  }),
  [conversationActions.FETCH_ALL_CONVERSATIONS_SUCCESS]: (
    state,
    { payload }
  ) => ({
    ...state,
    loading: false,
    conversationItems: payload,
  }),
  [conversationActions.FETCH_ALL_CONVERSATIONS_ERROR]: (state) => ({
    ...state,
    error: true,
  }),
  [conversationActions.ADD_CONVERSATION]: (
    state,
    { payload: { id, data } }
  ) => ({
    ...state,
    conversationItems: { ...state.conversationItems, [id]: data },
  }),
  [conversationActions.DELETE_CONVERSATION]: (state, { payload: { id } }) => ({
    ...state,
    conversationItems: { ...state.conversationItems, [id]: null },
  }),
  [conversationActions.ADD_MESSAGE_TO_CONVERSATION]: (
    state,
    { payload: { id, messageItem } }
  ) => ({
    ...initialState,
    conversationItems: {
      ...state.conversationItems,
      [id]: {
        ...(state.conversationItems && state.conversationItems[id]),
        messageDataList: [
          ...(state.conversationItems &&
            state.conversationItems[id] &&
            state.conversationItems[id].messageData),
          messageItem,
        ],
      },
    },
  }),
});
