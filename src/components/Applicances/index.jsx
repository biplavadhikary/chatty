import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import React from "react";
import userDataService from "../../services/userDataService";
import SystemDetailsDialog from "./SystemDetailsDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    boxSizing: "border-box",
    height: "100%",
    padding: theme.spacing(10, 30),
    alignItems: "center",
    color: "black",
  },
  secondLineGrid: {
    marginBottom: theme.spacing(7),
  },
  textFieldFull: {
    marginBottom: theme.spacing(5),
  },
  textField: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: "25ch",
  },
  inputRoot: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#636F88",
      borderWidth: 3,
    },
  },
  notchedOutline: {
    borderColor: "#796789",
    borderWidth: 2,
  },
  labelRoot: {
    color: "black",
  },
  labelRoot2: {
    color: "rgb(128, 128, 128, 0.48)",
  },
  input: {
    color: "black",
  },
  notchedOutline2: {
    borderColor: "#796789",
    borderWidth: 2,
  },
  inputRoot2: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline2": {
      borderColor: "teal",
      borderWidth: 2,
    },
  },
  submitButton: {
    background: "teal",
    "&:hover": {
      background: "#005050",
    },
  },
}));

export default function Appliances() {
  const classes = useStyles();
  const [isModalOpen, setModal] = React.useState(false);
  const [systemDetails, setSystemDetails] = React.useState({});
  const [isFetching, setFetchStatus] = React.useState(false);
  const [ipAddress, setIpAddress] = React.useState("");
  const [endpoint, setEndpoint] = React.useState("");
  const [optionalKey, setOptionalKey] = React.useState("");
  const [optionalValue, setOptionalValue] = React.useState("");

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const isClickable = () => {
    if (ipAddress.trim().length > 1 && endpoint.trim().length > 1) {
      const opKeyLen = optionalKey.trim().length;
      const opValLen = optionalValue.trim().length;
      if (opKeyLen == 0 && opValLen == 0) {
        return true;
      } else if (opKeyLen > 0 && opValLen > 0) {
        return true;
      }
    }
    return false;
  };

  const fetchDetails = () => {
    if (isFetching) return;

    const requestParams = {};

    requestParams.ip = ipAddress;
    requestParams.endpoint = endpoint;

    const opKeyLen = optionalKey.trim().length;
    const opValLen = optionalValue.trim().length;

    if (opKeyLen > 0 && opValLen > 0) {
      requestParams[optionalKey] = optionalValue;
    }

    setFetchStatus(true);
    userDataService
      .getSystemDetails(requestParams)
      .then((response) => {
        console.log("System-Details - ", response?.data);
        setSystemDetails(response?.data);
        setFetchStatus(false);
        handleModalOpen();
      })
      .catch(() => {
        setFetchStatus(false);
      });
  };

  const isButtonDisabled = !isClickable();

  const keyPressHandler = (e) => {
    switch (e.keyCode) {
      case 13:
        if (!isButtonDisabled) {
          fetchDetails();
        }
        break;
    }
  };

  return (
    <div className={classes.root} onKeyDown={keyPressHandler}>
      <Grid container direction="column">
        <TextField
          id="IpAddress"
          label="IP Address (*)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="Please Enter the IP Address"
          helperText="Input the IP Address for which you're checking"
          fullWidth
          color="secondary"
          margin="normal"
          className={classes.textFieldFull}
          InputLabelProps={{
            shrink: true,
            classes: {
              root: classes.labelRoot,
            },
          }}
          InputProps={{
            classes: {
              root: classes.inputRoot,
              notchedOutline: classes.notchedOutline,
              // focused: classes.outlinePurpleFocused,
              input: classes.input,
            },
          }}
          variant="outlined"
        />
        <Grid
          container
          xs={12}
          alignItems="flex-end"
          justifyContent="center"
          className={classes.secondLineGrid}
        >
          <TextField
            label="Endpoint (*)"
            id="endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            // defaultValue="Default Value"
            className={classes.textField}
            helperText="Endpoint Name"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.labelRoot2,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot2,
                notchedOutline: classes.notchedOutline2,
                input: classes.input,
              },
            }}
          />
          <TextField
            label="Data Key"
            id="data2"
            value={optionalKey}
            onChange={(e) => setOptionalKey(e.target.value)}
            // defaultValue=""
            className={classes.textField}
            helperText="If any optional field is need"
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.labelRootLight,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot2,
                notchedOutline: classes.notchedOutline2,
                input: classes.input,
              },
            }}
          />
          <TextField
            label="Data Value"
            id="data3"
            value={optionalValue}
            onChange={(e) => setOptionalValue(e.target.value)}
            className={classes.textField}
            helperText="If any optional field is need"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.labelRoot2,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot2,
                notchedOutline: classes.notchedOutline2,
                input: classes.input,
              },
            }}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className={classes.submitButton}
            onClick={fetchDetails}
            disabled={isButtonDisabled}
          >
            Get Details
          </Button>
        </Grid>
      </Grid>

      <SystemDetailsDialog
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        data={systemDetails}
      />
    </div>
  );
}
