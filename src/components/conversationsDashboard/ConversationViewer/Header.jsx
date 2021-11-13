import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const emptyFunction = () => {};

const useStyles = makeStyles(() => ({
  button: {
    background: "none",
    border: 0,
    height: "2rem",
    padding: "0.5rem 1rem",
    width: "100%",
    transition: "all 0.1s linear",
    "&:focus": {
      outline: 0,
      textShadow: "0px 0px 8px rgb(135, 160, 255)",
    },
    "&:hover": {
      color: "#00417b",
    },
  },
  wrapperDivSide: {
    minWidth: "15%",
  },
  more: {
    fontWeight: "bold",
    color: "black",
  },
  title: {},
  back: {
    fontWeight: "bold",
    color: "black",
    textTransform: "none",
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

function Header({
  name,
  onClickFirstButton,
  hideMoreMenu = false,
  hideFirstButton = false,
  firstButtonText = "Profile",
  secondButtonText = "...",
  onClickSecondButton = emptyFunction,
}) {
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
      <div className={classes.wrapperDivSide}>
        {!hideFirstButton && (
          <Button
            className={clsx(classes.back, classes.button)}
            onClick={onClickFirstButton}
            disableRipple
          >
            {firstButtonText}
          </Button>
        )}
      </div>

      <h1 className={classes.name}>{name || "Unknown"}</h1>

      <div className={classes.wrapperDivSide}>
        {!hideMoreMenu && (
          <Button
            className={clsx(classes.more, classes.button)}
            onClick={
              secondButtonText === "..."
                ? handleMoreMenuClick
                : onClickSecondButton
            }
            disableRipple
          >
            {secondButtonText}
          </Button>
        )}
      </div>
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
