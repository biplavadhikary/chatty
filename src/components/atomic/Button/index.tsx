import React from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import buttonStyle from "./buttonStyle";

type RegularButtonType = {
  color:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "rose"
    | "white"
    | "facebook"
    | "twitter"
    | "google"
    | "github"
    | "transparent";
  size?: "sm" | "lg";
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  children: React.ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  className?: string;
  rest?: Record<string, any>;
  onClick?: (event: any) => void;
};

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle,
}));

const RegularButton = (props: RegularButtonType) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size = "lg",
    block,
    link,
    justIcon,
    className = "",
    ...rest
  } = props;

  const classes = makeComponentStyles();

  const btnClasses = clsx({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Button {...rest} className={btnClasses}>
      {children}
    </Button>
  );
};

export default RegularButton;
