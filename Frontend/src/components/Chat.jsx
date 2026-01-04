import React, { useEffect, useState } from "react";
import styles from "../css modules/chat.module.css";
import { useRefresh } from "../contexts/EventRefreshProvider";
import ChatGroup from "./ChatGroup";
import io from "socket.io-client";
import socket from "./Socket";

function Chat() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState({});
  console.log(messages);
  const [inputText, setInputText] = useState("");
  const { state } = useRefresh();
  const [activeChat, setActiveChat] = useState(null);
  const [eventsForUser, setEventsForUser] = useState([]);
  async function fetchEventsAgainstUser() {
    const response = await fetch("http://localhost:8000/getEventsForUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("user"))._id,
      }),
    });
    if (!response.ok) {
      throw new Response("Failed to fetch events against User", {
        status: 500,
      });
    } else {
      const data = await response.json();
      const eventList = data.eventsForUser.eventsJoined;
      setEventsForUser(eventList);
    }
  }
  useEffect(() => {
    fetchEventsAgainstUser();
  }, [state]);

  function sendMessage() {
    if (!inputText.trim() || !activeChat) return;

    socket.emit("sendMessage", {
      eventId: activeChat,
      message: inputText.trim(),
      userName: currentUser.name,
      userId: currentUser._id,
    });
    setInputText("");
  }

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (activeChat == msg.eventId) {
        setMessages((prev) => ({
          ...prev,
          [msg.eventId]: [...(prev[msg.eventId] || []), msg],
        }));
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [activeChat]);

  function LeftPane() {
    return (
      <div className={styles.leftPane}>
        {eventsForUser.map((event) => {
          return (
            <ChatGroup
              groupName={event.title}
              img={event.img}
              onClick={async () => {
                if (activeChat) {
                  socket.emit("leaveEventChat", activeChat);
                }
                socket.emit("joinEventChat", event._id);
                const messagesNew = await fetch(
                  "http://localhost:8000/getMessageHistory",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      eventId:event._id
                    }),
                  }
                );
                const messageHistory= await messagesNew.json()

                console.log(messageHistory)
                setMessages((prev)=>({
                  ...prev,
                  [event._id]:messageHistory.messages || []
                }))
                setActiveChat(event._id);
              }}
            ></ChatGroup>
          );
        })}
      </div>
    );
  }
  function RightPane() {
    if (!activeChat) {
      return (
        <div
          className={
            styles.rightPane + " flex items-center justify-center text-gray-500"
          }
        >
          Select an event to start chatting
        </div>
      );
    }

    const currentEvent = eventsForUser.find((e) => e._id === activeChat);
    const currentMessages = messages[activeChat] || [];
    console.log(currentMessages);
    return (
      <div className={styles.rightPane}>
        {/* Header */}
        <div className={styles.chatHeader}>{currentEvent?.title} Chat</div>

        {/* Messages */}
        <div className={styles.messagesArea}>
          {currentMessages.map((msg) => (
            <div
              className={`${styles.message} ${
                msg.userId === currentUser._id ? styles.ownMessage : ""
              }`}
            >
              <div className={styles.messageUser}>{msg.userName}</div>
              <div className={styles.messageText}>{msg.message}</div>
              <div className={styles.messageTime}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              e.preventDefault();
              setInputText(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className={styles.messageInput}
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.chatWindow}>
      <LeftPane></LeftPane>
      <RightPane></RightPane>
    </div>
  );
}

export default Chat;
