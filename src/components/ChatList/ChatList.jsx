import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";

const ChatList = () => {
  const { currentUser } = useAuthContext();
  const { dispatch, connectedUsers } = useChatContext();
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
    <>
      <h2 className="container">Recientes</h2>
      <hr />
      <div className="chat-list container">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <Link to="/chat" key={chat[0]}>
              <div
                className="user"
                onClick={() =>
                  dispatch({
                    type: "changeUser",
                    payload: chat[1].userInfo,
                  })
                }
              >
                <div className="user-info">
                  <div className="profile-image">
                    <div className={connectedUsers.includes(chat[1].userInfo.uid) ? "user-status-dot online": "user-status-dot offline"}></div>
                    {chat[1].unreadMessages > 0 ? (
                      <span className="unread">{chat[1].unreadMessages}</span>
                    ) : (
                      <></>
                    )}
                    {chat[1].userInfo.photoURL ? (
                      <img
                        src={chat[1].userInfo.photoURL}
                        alt="img"
                        className="profile-image"
                      />
                    ) : (
                      <div className="not-found">
                        {chat[1].userInfo.displayName
                          ?.toUpperCase()
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </div>

                  <div className="chat-info">
                    <h2 className="name">{chat[1].userInfo.displayName}</h2>
                    <small className="message">
                      {chat[1].lastMessage?.text.length > 15
                        ? chat[1].lastMessage?.text.slice(0, 14) + "..."
                        : chat[1].lastMessage?.text}
                    </small>
                  </div>
                </div>
                <p className="time end-slot">
                  {chat[1].date.toDate().toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ChatList;
