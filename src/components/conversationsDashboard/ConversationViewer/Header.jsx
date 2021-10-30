import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(() => ({
  button: {
    background: "none",
    border: 0,
    height: "2rem",
    padding: "0.5rem 1rem",
    width: "4rem",
    transition: "all 0.1s linear",
    "&:focus": {
      outline: 0,
      textShadow: "0px 0px 8px rgb(135, 160, 255)",
    },
    "&:hover": {
      color: "#00417b",
    },
  },
  more: {
    fontWeight: "bold",
    color: "black",
  },
  title: {},
  back: {
    fontWeight: "bold",
  },
  name: {
    fontSize: "1.25em",
    fontWeight: 500,
    color: "#00417b",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreMenuText: {
    color: "black",
  },
}));

function Header({ name, onProfileClick }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMoreMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.header}>
      <button
        className={clsx(classes.back, classes.button)}
        onClick={onProfileClick}
      >
        Profile
      </button>
      <h1 className={classes.name}>{name || "Unknown"}</h1>
      <Button
        className={clsx(classes.more, classes.button)}
        onClick={handleMoreMenuClick}
      >
        ...
      </Button>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMoreMenuClose}
      >
        <MenuItem onClick={handleMoreMenuClose}>
          <Typography className={classes.moreMenuText}>Clear Chat</Typography>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <Typography className={classes.moreMenuText}>View Details</Typography>
        </MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>
          <Typography className={classes.moreMenuText}>Block</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
