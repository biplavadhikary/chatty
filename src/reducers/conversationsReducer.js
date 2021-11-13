import { createReducer } from "@reduxjs/toolkit";
import { conversationActions } from "../actions/type";

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
  [conversationActions.CLEAR_ALL_CONVERSATIONS]: () => ({
    ...initialState,
  }),
  [conversationActions.ADD_MESSAGE_TO_CONVERSATION]: (
    state,
    { payload: { id, messageItem } }
  ) => {
    if (!state?.conversationItems?.[id])
      return {
        ...state,
        conversationItems: {
          ...state.conversationItems,
          [id]: {
            userId: id,
            messageDataList: [messageItem],
          },
        },
      };

    return {
      ...state,
      conversationItems: {
        ...state.conversationItems,
        [id]: {
          ...(state.conversationItems && state.conversationItems[id]),
          messageDataList: [
            ...(state.conversationItems &&
              state.conversationItems[id] &&
              state.conversationItems[id].messageDataList),
            messageItem,
          ],
        },
      },
    };
  },
});
