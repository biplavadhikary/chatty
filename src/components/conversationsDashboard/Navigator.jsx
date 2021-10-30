import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Chip,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Navigator({ handleSignOut, classes }) {
  const fullName = useSelector(
    (state) => state.userData.authenticationResponse?.fullName
  );
  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="textPrimary" className={classes.title}>
          Conversation Dashboard
        </Typography>
        <div>
          <Chip
            variant="outlined"
            color="primary"
            className={classes.chip}
            label={
              <Typography color="textSecondary" className={classes.chipText}>
                {fullName}
              </Typography>
            }
            avatar={<Avatar>{fullName?.[0] ?? ""}</Avatar>}
          />
          <Button color="textSecondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
