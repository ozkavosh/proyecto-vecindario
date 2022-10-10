import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Notification.css";

const Notification = ({ type, sender }) => {
  return (
    <Link to="" className="notification">
      <div className="type">{type === "msg" ? <FaRegCommentDots /> : <FaRegThumbsUp />}</div>
      <p>
        <strong>{sender}</strong> envió un mensaje
      </p>
    </Link>
  );
};

export default Notification;
