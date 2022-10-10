import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { db } from "../../firebase/config";
import ChatListItem from "../ChatListItem/ChatListItem";
import "./ChatList.css";

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
