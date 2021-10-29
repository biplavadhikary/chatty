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

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
}

const totalAvatarColors = 10;
const randomizedAvatarColors = Array(totalAvatarColors).fill().map(randomColor);

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  conversationsSiderBar: {
    width: "36%",
    height: "100%",
    borderRight: "1px solid #d6d6d6",
  },
  conversationsChatContainer: {
    width: "64%",
    height: "100%",
  },
  peekMessageText: {
    color: "#a7a7a7",
  },
}));

export default function ConversationsViewer() {
  const classes = useStyles();
  const conversations = useSelector(
    (state) => state.conversations.conversationItems,
    shallowEqual
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleConversationClick = (event, userId, index) => {
    console.log("CLICK", userId, index);
    setSelectedIndex(index);
  };

  console.log("Conversations:::", conversations);
  if (!conversations || Object.keys(conversations) < 1) {
    return <div>No Conversation Found</div>;
  }
  return (
    <div className={classes.root}>
      <div className={classes.conversationsSiderBar}>
        <List className={classes.listRoot}>
          {Object.values(conversations).map((conversationItem, index) => {
            return (
              <React.Fragment key={conversationItem.userId}>
                <ListItem
                  button
                  alignItems="flex-start"
                  selected={selectedIndex === index}
                  onClick={(event) =>
                    handleConversationClick(
                      event,
                      conversationItem.userId,
                      index
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        backgroundColor:
                          randomizedAvatarColors[index % totalAvatarColors],
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${conversationItem.firstName} ${conversationItem.lastName}`}
                    secondary={
                      <Typography className={classes.peekMessageText}>
                        {conversationItem?.messageDataList?.[
                          conversationItem?.messageDataList?.length - 1 ?? 0
                        ]?.message || "--"}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </div>
      <div className={classes.conversationsChatContainer}></div>
    </div>
  );
}
