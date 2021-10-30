import React from "react";
import posed from "react-pose";
import { formatDate, formatTime } from "../../../utils/formatters";
import { smoothScrollToBottomFunc } from "../../../utils/uiUtils";
import Person from "./Person";

const ChatWindow = posed.ol({
  visible: {
    staggerChildren: 120,
  },
  hidden: {
    staggerChildren: 100,
  },
});

const MessageItem = posed.li({
  visible: {
    x: 0,
    opacity: 1,
  },
  hidden: {
    x: ({ fromDirection }) => (fromDirection === "left" ? -350 : 350),
    opacity: 0,
  },
});

function Chat({ messages, person, visible, onAnimComplete }) {
  const chatWindowRef = React.useRef(null);

  React.useEffect(() => {
    smoothScrollToBottomFunc(chatWindowRef);
  }, [messages]);

  console.log("Messages", messages);

  return (
    <ChatWindow
      className="chat"
      pose={visible ? "visible" : "hidden"}
      onPoseComplete={onAnimComplete}
      ref={chatWindowRef}
    >
      {messages.map((m) => (
        <MessageItem
          className={`container ${m.isSender ? "sent" : "received"}`}
          fromDirection={m.isSender ? "right" : "left"}
          key={m.messageId}
        >
          {person && !m.isSender && (
            <div className="person-container">
              <Person {...person} active={true} />
            </div>
          )}
          <div className="message">
            <div>{m.message}</div>
            <div className="date">
              <div className="time">
                {m.dateTime ? formatTime(m.dateTime) : "--"}
              </div>
              <div className="date">
                {m.dateTime ? formatDate(m.dateTime) : ""}
              </div>
            </div>
          </div>
        </MessageItem>
      ))}
    </ChatWindow>
  );
}

export default Chat;
