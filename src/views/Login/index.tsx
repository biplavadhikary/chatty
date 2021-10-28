import React from "react";
import CustomInput from "../../components/atomic/Input";
import Button from "../../components/atomic/Button";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import homeStyles from "./styles";
import clsx from "clsx";
import authenticationService from "../../services/authenticationService";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationFailed,
  authenticationSuccess,
  initiateAuthentication,
  resetAuthenticationStatus,
} from "../../actions/userDataActions";

const useHomeStyles = makeStyles(homeStyles);

const Login = () => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isAuthenticating = useSelector(
    (state) => state.userData.isAuthenticating
  );
  const authenticationStatus = useSelector(
    (state) => state.userData.authenticationStatus
  );

  const authenticateUser = async () => {
    dispatch(initiateAuthentication());
    const response = await authenticationService.authenticateUser(
      userName,
      password
    );

    if (response.data?.success === true) {
      dispatch(authenticationSuccess(response.data));
    } else {
      dispatch(authenticationFailed());
    }
  };

  const keyPressHandler = (e: any) => {
    switch (e.keyCode) {
      case 13:
        authenticateUser();
        break;
    }
  };

  const getInformationMessage = () => {
    console.log("DATA:::", authenticationStatus, isAuthenticating);
    if (isAuthenticating) return "";
    else if (authenticationStatus == "failed") return "Authetication Failed";
    else if (authenticationStatus == "success")
      return "Authentication Success. Logging in now...";
    return "";
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.messageArea}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={clsx(classes.informationText, {
            [classes.messageSuccess]: authenticationStatus == "success",
          })}
        >
          {getInformationMessage()}
        </Typography>
      </div>
      <form className={clsx(classes.form)}>
        <CustomInput
          labelText="User Id"
          id="text"
          value={userName}
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={(event) => setUserName(event.target.value)}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          value={password}
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={(event) => setPassword(event.target.value)}
          type="password"
          inputProps={{ onKeyDown: keyPressHandler }}
        />

        <Button
          type="button"
          color="primary"
          className="form__custom-button"
          onClick={authenticateUser}
          disabled={userName === "" || password.length < 4}
        >
          Log in
        </Button>
      </form>
      <div>
        {isAuthenticating && (
          <div className={classes.progressWrapper}>
            <CircularProgress color="secondary" style={{ color: "white" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
