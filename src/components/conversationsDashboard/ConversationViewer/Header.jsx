import { makeStyles } from "@material-ui/core";
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
}));

function Header({ name, onShuffle }) {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <button
        className={clsx(classes.back, classes.button)}
        onClick={onShuffle}
      >
        Shuffle
      </button>
      <h1 className={classes.name}>{name}</h1>
      <button className={clsx(classes.more, classes.button)}>...</button>
    </div>
  );
}

export default Header;
