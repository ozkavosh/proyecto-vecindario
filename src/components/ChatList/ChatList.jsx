import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import "./ChatList.css";

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

  const adjustTimestamp = (date) => {
    let today = new Date();
    if (today.getDate() !== date.getDate()) {
      const formatDate = (date) => {
        let day = String(date.getDate()).padStart(2, "0");
        let month = String(date.getMonth() + 1).padStart(2, "0");
        return `${day}/${month}`;
      };
      let formattedDate = formatDate(date);
      return formattedDate;
    } else {
      const formatTime = (date) => {
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };
      let formattedTime = formatTime(date);
      return formattedTime;
    }
  };

  return (
    <>
      <div className="chat-list container">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <Link to="/chat" key={chat[0]}>
              {/* TODO: maybe this could be another component? */}
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
                    <div
                      className={
                        connectedUsers.includes(chat[1].userInfo.uid)
                          ? "user-status-dot online"
                          : "user-status-dot offline"
                      }
                    ></div>
                    {chat[1].unreadMessages > 0 ? (
                      <span className="unread">{chat[1].unreadMessages}</span>
                    ) : (
                      <></>
                    )}
                    {chat[1].userInfo.photoURL ? (
                      <img src={chat[1].userInfo.photoURL} alt="img" className="profile-image" />
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
                      {chat[1].lastMessage?.text.length > 55
                        ? chat[1].lastMessage?.text.slice(0, 54) + "..."
                        : chat[1].lastMessage?.text}
                    </small>
                  </div>
                </div>
                <p className="time end-slot">{adjustTimestamp(chat[1].date.toDate())}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ChatList;
