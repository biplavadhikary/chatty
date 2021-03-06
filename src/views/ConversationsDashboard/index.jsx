import React from "react";
import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAuthenticationStatus,
  resetSocketConnection,
} from "../../actions/userDataActions";
import { resetContacts } from "../../actions/contactActions";
import Navigator from "../../components/conversationsDashboard/Navigator";
import ConversationsViewer from "../../components/conversationsDashboard/ConversationViewer";
import {
  addMessageToConversation,
  clearAllConversations,
} from "../../actions/conversationActions";
// import CoversationsWindow from "../../components/conversationsDashboard/CoversationsWindow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  tabsContainer: {
    justifyContent: "center",
  },
  mainAreaWrapper: {
    width: "100%",
    //   height: ""
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "center",
    padding: theme.spacing(5, 10),
    height: "84vh",
  },
  mainArea: {
    width: "100%",
    height: "100%",
    color: "black",
  },
  appBar: {
    background: "rgba(8, 81, 108, 0.5)",
  },
  chip: {
    marginRight: "1rem",
  },
  chipText: {
    color: "rgb(195, 203, 227, 0.6)",
  },
}));

export default function ConversationsDashboard({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.userData.socket);
  const [value, setValue] = React.useState("conversations");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = () => {
    dispatch(resetAuthenticationStatus());
    dispatch(resetContacts());
    dispatch(resetSocketConnection());
    dispatch(clearAllConversations());
    history.push("/");
  };

  const getMessage = React.useCallback((data) => {
    console.log("RECEIVED:::", data);
    const { messageItem, sender } = data;
    dispatch(addMessageToConversation(sender, messageItem));
  }, []);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", getMessage);

    return () => socket.off("receive-message");
  }, []);

  const tabs = {
    conversations: {
      label: "My Conversations",
      component: ConversationsViewer,
    },
    contacts: {
      label: "My Contacts",
      component: React.Fragment,
    },
  };

  const getView = () => {
    const CurrentView = tabs[value].component;
    return <CurrentView />;
  };

  return (
    <div className={classes.root}>
      <Navigator handleSignOut={handleSignOut} classes={classes} />
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          classes={{ flexContainer: classes.tabsContainer }}
        >
          {Object.entries(tabs).map(([value, tabOptions]) => (
            <Tab
              key={tabOptions.label}
              label={tabOptions.label}
              value={value}
            />
          ))}
        </Tabs>
      </Paper>
      <div className={classes.mainAreaWrapper}>
        <Paper className={classes.mainArea}>{getView()}</Paper>
      </div>
    </div>
  );
}
