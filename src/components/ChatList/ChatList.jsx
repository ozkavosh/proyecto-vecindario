import "./ChatList.css";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../context/authContext";
import ChatListItem from "../ChatListItem/ChatListItem";

const ChatList = () => {
  const { currentUser } = useAuthContext();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => unsub();
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  return (
    <div className="chat-list container">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <ChatListItem chat={chat} key={chat[0]} />
        ))}
    </div>
  );
};

export default ChatList;
