import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ThreeDotsLoader from "../../components/svg/ThreeDotsLoader.tsx";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  contactFetchSuccess,
  fetchContacts,
} from "../../actions/contactActions";
import userDataService from "../../services/userDataService";
import {
  conversationFetchSuccess,
  fetchAllConversations,
} from "../../actions/conversationActions";
import { getChatSocket } from "../../utils/socketUtils";
import { createSocket } from "../../actions/userDataActions";

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
  const uuid = useSelector(
    (state) => state.userData.authenticationResponse?.uuid
  );
  const isContactsBeingFetch = useSelector(
    (state) => state.contactList.loading
  );
  const isSocketConnected = useSelector(
    (state) => state.userData.socket?.connected
  );

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const dispatch = useDispatch();

  // FETCH ALL API DATA

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchContacts());
      dispatch(fetchAllConversations());

      Promise.all([
        userDataService.fetchContactList(userId),
        userDataService.fetchConversations(userId),
      ]).then(([contactsResponse, conversationsResponse]) => {
        // console.log("CONTACTS-RESPONSE:::DATA", contactsResponse.data);
        // console.log("CONVO-RESPONSE:::DATA", conversationsResponse.data);

        dispatch(contactFetchSuccess(contactsResponse.data?.data?.contacts));
        dispatch(
          conversationFetchSuccess(
            conversationsResponse.data?.data?.conversationItems
          )
        );
        setDataLoaded(true);
      });
    }
  }, []);

  // INITIALIZE SOCKET

  React.useEffect(() => {
    const newSocket = io(getChatSocket(), {
      query: { userId: userId, uuid },
    });
    dispatch(createSocket(newSocket));
  }, []);

  // REDIRECT ON CONNECTION

  React.useEffect(() => {
    if (dataLoaded && isSocketConnected) {
      history.push(`/conversations-dashboard/${userId}`);
    }
  }, [dataLoaded]);

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
