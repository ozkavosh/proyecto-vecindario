import { useEffect, useRef, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
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
            <small>
              {connectedUsers.includes(data.user.uid)
                ? "En linea"
                : "Desconectad@"}
            </small>
          </div>
        </div>
        <FaRegTimesCircle
          className="closeChatBtn"
          onClick={() =>
            dispatch({
              type: "removeUser",
            })
          }
        />
      </div>

      <div className="messagesContainer">
        {messages.map((message) => (
          <div
            ref={messageRef}
            key={message.id}
            className={
              message.senderId === currentUser.uid ? "message own" : "message"
            }
          >
            <p className="text" key={message.id}>
              {message.text}
            </p>
            <p className="date">{message.date.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatMessages;
