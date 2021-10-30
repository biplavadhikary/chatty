import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ConversationSidebar from "./ConversationSidebar";
import CoversationsWindow from "./CoversationsWindow";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  conversationsChatContainer: {
    width: "64%",
    height: "100%",
  },
}));

export default function ConversationsViewer() {
  const classes = useStyles();
  const allConversations = useSelector(
    (state) => state.conversations.conversationItems,
    shallowEqual
  );

  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleConversationClick = (event, userId, index) => {
    // console.log("CLICK", userId, index);
    setSelectedUserId(userId);
  };

  console.log("Conversations:::", allConversations);

  if (!allConversations || Object.keys(allConversations) < 1) {
    return <div>No Conversation Found</div>;
  }

  return (
    <div className={classes.root}>
      <ConversationSidebar
        onConversationClick={handleConversationClick}
        selectedUserId={selectedUserId}
        conversations={allConversations}
      />
      <CoversationsWindow conversation={allConversations[selectedUserId]} />
    </div>
  );
}
