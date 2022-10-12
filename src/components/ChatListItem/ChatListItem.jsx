import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import { chatListFormat } from "../../utils/dateFormatters";
import "./ChatListItem.css";

const ChatListItem = ({ chat }) => {
  const { dispatch, connectedUsers } = useChatContext();
  const [ userInfo, setUserInfo ] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(chat[1]?.userInfo)(async ()=>{
      const request = await getDoc(doc(db, "users", chat[1].userInfo.uid));
      const { uid, photoUrl, displayName } = request.data();
      setUserInfo({ uid, photoUrl, displayName});
    })()
  },[chat])

  const handleClick = () => {
    dispatch({
      type: "changeUser",
      payload: userInfo,
    });

    navigate("/chat/messages");
  };

  return (
    <div
      className="chat-user-container"
      key={chat[0]}
      onClick={handleClick}
    >
      <div className="user">
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
            {userInfo.photoUrl ? (
              <img src={userInfo.photoUrl} alt="img" className="profile-image" />
            ) : (
              <div className="not-found">
                {userInfo.displayName
                  ?.toUpperCase()
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
          </div>

          <div className="chat-info">
            <h2 className="name">{userInfo.displayName}</h2>
            <small className="message">
              {chat[1].lastMessage?.text.length > 55
                ? chat[1].lastMessage?.text.slice(0, 54) + "..."
                : chat[1].lastMessage?.text}
            </small>
          </div>
        </div>
        <p className="time end-slot">{chat[1].date && chatListFormat(chat[1].date.toDate())}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
