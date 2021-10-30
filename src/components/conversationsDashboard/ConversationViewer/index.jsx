import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import theme from "../../../utils/helper/themeUtils";
import NoConversationSelectedArt from "../../svg/NoConversationSelectedArt";
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
  noConversationsContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  noConversationsText: {
    margin: theme.spacing(10, 5),
  },
}));

export default function ConversationsViewer() {
  const classes = useStyles();
  const allConversations = useSelector(
    (state) => state.conversations.conversationItems,
    shallowEqual
  );

  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleConversationClick = (event, userId) => {
    setSelectedUserId(userId);
  };

  // console.log("Conversations:::", allConversations);

  if (!allConversations || Object.keys(allConversations) < 1) {
    return (
      <div className={classes.noConversationsContainer}>
        <NoConversationSelectedArt width="530" height="230" />
        <Typography className={classes.noConversationsText}>
          No Conversations Found
        </Typography>
      </div>
    );
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
