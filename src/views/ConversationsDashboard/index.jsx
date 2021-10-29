import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { resetAuthenticationStatus } from "../../actions/userDataActions";
import { resetContacts } from "../../actions/contactActions";
import Navigator from "../../components/conversationsDashboard/Navigator";
import ConversationsViewer from "../../components/conversationsDashboard/ConversationsViewer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));

export default function ConversationsDashboard({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("conversations");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = () => {
    dispatch(resetAuthenticationStatus());
    dispatch(resetContacts());
    history.push("/");
  };

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
