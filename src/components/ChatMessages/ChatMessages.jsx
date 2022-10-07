import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import { chatMessageFormat } from "../../utils/dateFormatters";
import "./ChatMessages.css";
import { db } from "../../firebase/config";
import ChatInput from "../ChatInput/ChatInput";
import { useNavigate } from "react-router-dom";

const ChatMessages = () => {
  const { currentUser } = useAuthContext();
  const { data, connectedUsers } = useChatContext();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const messageRef = useRef();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (!data?.chatId) navigate("/chat", { replace: true });
    else {
      const unsub = onSnapshot(doc(db, "chats", data?.chatId), (d) => {
        d.exists() && setMessages(d.data().messages);
      });

      return async () => {
        unsub();
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [data?.chatId + ".unreadMessages"]: 0,
        });
      };
    }
  }, [data?.chatId, navigate, currentUser?.uid]);

  return (
    data?.chatId && (
      <div className="chatMessages">
        <div className="container">
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
                <p className="date">{chatMessageFormat(message.date.toDate())}</p>
              </div>
            ))}
          </div>

          <ChatInput />
        </div>
      </div>
    )
  );
};

export default ChatMessages;
