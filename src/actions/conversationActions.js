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

export const clearAllConversations = () => ({
  type: conversationActions.CLEAR_ALL_CONVERSATIONS,
});

export const conversationFetchFailed = () => ({
  type: conversationActions.FETCH_ALL_CONVERSATIONS_ERROR,
});

export const addMessageToConversation = (id, messageItem) => ({
  type: conversationActions.ADD_MESSAGE_TO_CONVERSATION,
  payload: { id, messageItem },
});
