import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default function Navigator({ handleSignOut, classes }) {
  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="textPrimary" className={classes.title}>
          Conversation Dashboard
        </Typography>
        <Button color="textSecondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
