import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  SnackbarContent,
} from "@material-ui/core";
import Header from "../conversationsDashboard/ConversationViewer/Header";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { smoothScrollToBottomFunc } from "../../utils/uiUtils";
import {
  clearAllNotifications,
  deleteNotification,
  disableNotifications,
  enableNotifications,
} from "../../actions/notificationActions";

const useStyles = makeStyles((theme) => ({
  pane: {
    boxSizing: "border-box",
    borderBottom: "2px solid #efefef",
    background: "rgba(0, 0, 0, 0.02)",
    width: "100%",
    padding: theme.spacing(2, 2),
    margin: "1px",
  },
  h100: {
    height: "100%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  notificationsWrapper: {
    boxSizing: "border-box",
    maxWidth: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2, 0),
    width: "100%",
    height: "80%",
    overflowY: "auto",
    scrollBehavior: "smooth",

    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  content: {
    background: "rgb(250, 250, 250)",
    color: "rgba(0, 0, 0, 0.87)",
  },
}));

export default function NotificationViewer() {
  const classes = useStyles();
  const viewerRef = React.useRef(null);
  const messageItems = useSelector((state) => state.notification.notifications);
  const isNotificationEnabled = useSelector(
    (state) => state.notification.isEnabled
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    smoothScrollToBottomFunc(viewerRef);
  }, [messageItems]);

  const removeNotification = (id) => {
    dispatch(deleteNotification(id));
  };

  const removeAllNotifications = () => {
    dispatch(clearAllNotifications());
  };

  const getButton = (id) => (
    <Button
      onClick={() => removeNotification(id)}
      color="secondary"
      size="small"
    >
      Remove
    </Button>
  );

  const toggleNotifications = () => {
    dispatch(
      isNotificationEnabled ? disableNotifications() : enableNotifications()
    );
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.h100}
    >
      <Grid item xs={10} md={8} lg={6} className={classes.h100}>
        <Paper
          elevation={3}
          variant="outlined"
          className={clsx(classes.paper, classes.h100)}
        >
          <div className={classes.pane}>
            <Header
              name="Notifications"
              onClickFirstButton={removeAllNotifications}
              firstButtonText="Clear All"
              secondButtonText={isNotificationEnabled ? "Disable" : "Enable"}
              onClickSecondButton={toggleNotifications}
            />
          </div>
          <div className={classes.notificationsWrapper} ref={viewerRef}>
            {messageItems.map((item) => (
              <SnackbarContent
                key={item.id}
                className={classes.content}
                message={item.message}
                action={getButton(item.id)}
              />
            ))}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
