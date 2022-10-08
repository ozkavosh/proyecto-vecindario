import "./ChatListItem.css";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/chatContext";
import { chatListFormat } from "../../utils/dateFormatters";

const ChatListItem = ({ chat }) => {
  const { dispatch, connectedUsers } = useChatContext();
  const navigate = useNavigate();

  const handleClick = (user) => {
    dispatch({
      type: "changeUser",
      payload: user,
    });

    navigate("/chat/messages");
  };

  return (
    <div
      className="chat-user-container"
      key={chat[0]}
      onClick={() => handleClick(chat[1].userInfo)}
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
              {chat[1].lastMessage?.text.length > 55
                ? chat[1].lastMessage?.text.slice(0, 54) + "..."
                : chat[1].lastMessage?.text}
            </small>
          </div>
        </div>
        <p className="time end-slot">
          {chat[1].date && chatListFormat(chat[1].date.toDate())}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
