import { conversationActions } from "./type";

export const fetchAllConversations = () => ({
  type: conversationActions.FETCH_ALL_CONVERSATIONS,
});

export const conversationFetchSuccess = (payload) => ({
  type: conversationActions.FETCH_ALL_CONVERSATIONS_SUCCESS,
  payload,
});

export const deleteConversation = (id) => ({
  type: conversationActions.DELETE_CONVERSATION,
  payload: { id },
});

export const conversationFetchFailed = () => ({
  type: conversationActions.FETCH_ALL_CONVERSATIONS_ERROR,
});

export const addCoMessageToConversation = (id, messageItem) => ({
  type: conversationActions.ADD_CONVERSATION,
  payload: { id, messageItem },
});