import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessageToConversation } from "../../../actions/conversationActions";
import theme from "../../../utils/helper/themeUtils";
import { createNewMessageItem } from "../../../utils/textUtils";
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
  pane: {
    boxSizing: "border-box",
    borderBottom: "1px solid #efefef",
    paddingBottom: "1rem",
    margin: "1px",
  },
}));

export default function CoversationsWindow({ conversation }) {
  const classes = useStyles();
  const [iteration, setInteration] = useState(0);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  if (!conversation) {
    return (
      <div className={classes.wrapper}>
        <Typography>No Conversations Found</Typography>
      </div>
    );
  }

  const { messageDataList, ...personInformation } = conversation;
  // console.log("Person", personInformation);

  const addMessage = (e, val, clearDisplayFunc) => {
    console.log("Message:::", val?.trim().length > 0);
    if (val?.trim().length > 0) {
      const item = createNewMessageItem(val, false);
      console.log("Message2:::", item, personInformation.userId);
      clearDisplayFunc?.();
      dispatch(addMessageToConversation(personInformation.userId, item));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.pane}>
        <Header
          name={`${conversation.firstName} ${conversation.lastName}`}
          onShuffle={() => setInteration(1 + iteration)}
        />
      </div>

      <Chat
        messages={messageDataList}
        person={personInformation}
        visible={visible}
        onAnimComplete={emptyFunction}
      />
      <Composer onClickEnter={addMessage} />
    </div>
  );
}
