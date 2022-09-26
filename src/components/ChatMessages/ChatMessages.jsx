import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import "./ChatMessages.css";
import { db } from "../../firebase/config";
import ChatInput from "../ChatInput/ChatInput";

const ChatMessages = () => {
  const { currentUser } = useAuthContext();
  const { dispatch, data, connectedUsers } = useChatContext();
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsub();
  }, [data.chatId]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });

    return async () => {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".unreadMessages"]: 0,
      });
    };
  }, [messages, data?.chatId, currentUser?.uid]);

  const formatDate = (date) => {
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let year = date.getFullYear();

    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  return (
    <div className="chatMessages container">
      <div className="chatHeader">
        <div className="user-info">
          <div className="profile-image">
            <div className="not-found">
              {data.user.displayName
                ?.toUpperCase()
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
          </div>
          <div className="user-display">
            <h2>{data.user.displayName}</h2>
            <small>{connectedUsers.includes(data.user.uid) ? "En linea" : "Offline"}</small>
          </div>
        </div>
        {/* TODO: change this button function to the back button */}
        {/* <FaRegTimesCircle
          className="closeChatBtn"
          onClick={() =>
            dispatch({
              type: "removeUser",
            })
          }
        /> */}
      </div>

      <div className="messagesContainer">
        {messages.map((message) => (
          <div
            ref={messageRef}
            key={message.id}
            className={message.senderId === currentUser.uid ? "message own" : "message"}
          >
            <p className="text" key={message.id}>
              {message.text}
            </p>
            <p className="date">{formatDate(message.date.toDate())}</p>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatMessages;
