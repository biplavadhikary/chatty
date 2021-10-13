import React from "react";
import CustomInput from "../../components/atomic/Input";
import Button from "../../components/atomic/Button";
import { makeStyles } from "@material-ui/core";
import homeStyles from "./styles";
import clsx from "clsx";

const emptyFunction = () => {};
const useHomeStyles = makeStyles(homeStyles);

const Login = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.homeContainer}>
      <form className={clsx(classes.form)}>
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={emptyFunction}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={emptyFunction}
          type="password"
        />

        <Button type="button" color="primary" className="form__custom-button">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
