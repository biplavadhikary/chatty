import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToConversation } from "../../../actions/conversationActions";
import { getDisplayName } from "../../../utils/dataUtils";
import theme from "../../../utils/helper/themeUtils";
import { createNewMessageItem } from "../../../utils/textUtils";
import ChooseConversationArt from "../../svg/ChooseConversationArt";
import Chat from "./Chat";
import Composer from "./Composer";
import Header from "./Header";

const emptyFunction = () => {};

const useStyles = makeStyles(() => ({
  wrapper: {
    boxSizing: "border-box",
    padding: theme.spacing(2, 0, 0, 0),
    width: "64%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  wrapperNoChatSelected: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  pane: {
    boxSizing: "border-box",
    borderBottom: "1px solid #efefef",
    paddingBottom: "1rem",
    margin: "1px",
  },
  noConversationsSelectedText: {
    margin: theme.spacing(10, 5),
  },
}));

export default function CoversationsWindow({ conversation }) {
  const classes = useStyles();
  const socket = useSelector((state) => state.userData.socket);
  const senderId = useSelector(
    (state) => state.userData.authenticationResponse?.userId
  );
  const dispatch = useDispatch();

  if (!conversation) {
    return (
      <div className={classes.wrapperNoChatSelected}>
        <ChooseConversationArt width="360" height="220" />
        <Typography className={classes.noConversationsSelectedText}>
          Select any Conversation
        </Typography>
      </div>
    );
  }

  const { messageDataList, ...personInformation } = conversation;
  console.log("Person", personInformation);

  const sendMessage = (recipients, messageItem) => {
    if (socket) {
      socket.emit("send-message", { recipients, messageItem });
    }
  };

  const onSendAction = (e, val, clearDisplayFunc) => {
    if (val?.trim().length > 0) {
      const messageItem = createNewMessageItem(val, senderId);
      clearDisplayFunc?.();

      const recipients = [personInformation.userId];
      sendMessage(recipients, messageItem);
      dispatch(addMessageToConversation(personInformation.userId, messageItem));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.pane}>
        <Header
          name={getDisplayName(conversation)}
          onProfileClick={emptyFunction}
        />
      </div>

      <Chat
        messages={messageDataList}
        person={personInformation}
        visible
        onAnimComplete={emptyFunction}
      />
      <Composer onClickEnter={onSendAction} />
    </div>
  );
}
