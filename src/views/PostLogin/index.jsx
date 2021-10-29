import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ThreeDotsLoader from "../../components/svg/ThreeDotsLoader.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  contactFetchSuccess,
  fetchContacts,
} from "../../actions/contactActions";
import userDataService from "../../services/userDataService";
import {
  conversationFetchSuccess,
  fetchAllConversations,
} from "../../actions/conversationActions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
}));

export default function PostLogin({ history }) {
  const classes = useStyles();
  const userId = useSelector(
    (state) => state.userData.authenticationResponse?.userId
  );
  const isContactsBeingFetch = useSelector(
    (state) => state.contactList.loading
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userId) {
      console.log("Initaiting Fetch");
      dispatch(fetchContacts());
      dispatch(fetchAllConversations());
      Promise.all([
        userDataService.fetchContactList(userId),
        userDataService.fetchConversations(userId),
      ]).then(([contactsResponse, conversationsResponse]) => {
        console.log("CONTACTS-RESPONSE:::DATA", contactsResponse.data);
        console.log("CONVO-RESPONSE:::DATA", conversationsResponse.data);

        dispatch(contactFetchSuccess(contactsResponse.data?.data?.contacts));
        dispatch(
          conversationFetchSuccess(
            conversationsResponse.data?.data?.conversationItems
          )
        );
        history.push("/conversations-dashboard");
      });
    }
  }, []);

  return (
    <>
      {isContactsBeingFetch && (
        <div className={classes.root}>
          <ThreeDotsLoader />
          <Typography color="textSecondary">Loading your Chats ...</Typography>
        </div>
      )}
    </>
  );
}
