import "./Notification.css";
import { FaRegCommentDots, FaRegThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Notification = ({ version }) => {
  return (
    <>
      {version === 0 ? (
        <Link to="" className="notification">
          <div className="type">
            <FaRegCommentDots />
          </div>
          <p>Darío Peretti envió un mensaje</p>
        </Link>
      ) : (
        <Link to="" className="notification">
          <div className="type">
            <FaRegThumbsUp />
          </div>
          <p>A María Amenta le gustó tu reseña</p>
        </Link>
      )}
    </>
  );
};

export default Notification;
