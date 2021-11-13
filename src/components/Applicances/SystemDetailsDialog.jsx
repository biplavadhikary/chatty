import { makeStyles, Modal, Typography } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import React from "react";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: "absolute",
    width: 400,
    height: 300,
    left: `calc(50vw - ${400 / 2}px)`,
    top: `calc(50vh - ${300 / 2}px)`,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  noDetailsWrapper: {
    boxSizing: "border-box",
    padding: theme.spacing(10),
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsWrapper: {
    padding: theme.spacing(2, 0),
  },
  itemWrapper: {
    display: "flex",
  },
  keyText: {
    textTransform: "capitalize",
    minWidth: "10vw",
  },
  valueText: {
    color: "grey",
  },
}));

export default function SystemDetailsDialog({
  isModalOpen,
  handleModalClose,
  data: { success = false, data = {} } = {},
}) {
  const classes = useStyles();

  const getContent = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>

        <div className={classes.detailsWrapper}>
          {Object.entries(data).map(([key, value]) => (
            <div className={classes.itemWrapper} key={`${key}${value}`}>
              <Typography
                variant="body1"
                display="inline"
                className={classes.keyText}
              >
                {key}: &nbsp;
              </Typography>
              <Typography
                variant="body1"
                display="inline"
                className={classes.valueText}
              >
                {value}
              </Typography>
            </div>
          ))}
        </div>
      </>
    );
  };

  const noShowDetailsView = () => (
    <div className={classes.noDetailsWrapper}>
      <InfoOutlinedIcon />
      &nbsp;
      <Typography variant="h6">No Details Found</Typography>
    </div>
  );

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modalPaper}>
        {success ? getContent() : noShowDetailsView()}
      </div>
    </Modal>
  );
}
