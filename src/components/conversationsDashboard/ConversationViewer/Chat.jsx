import React from "react";
import posed from "react-pose";
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

function formatTime(date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}

function formatDate(date) {
  return `${date.getDate()}/${date.getMonth()}`;
}

function Chat({ messages, person, visible, onAnimComplete }) {
  console.log("CHAT:::", messages);
  return (
    <ChatWindow
      className="chat"
      pose={visible ? "visible" : "hidden"}
      onPoseComplete={onAnimComplete}
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
              <div className="time">{m.date ? formatTime(m.date) : "--"}</div>
              <div className="date">{m.date ? formatDate(m.date) : ""}</div>
            </div>
          </div>
        </MessageItem>
      ))}
    </ChatWindow>
  );
}

export default Chat;
