import { FaRegStar, FaStar } from "react-icons/fa";
import "./Stars.css";

const Stars = ({ ammount, onClick }) => {
  return (
    <div className="stars">
      {ammount ? (
        [...Array(5)].map((_, i) =>
          i < ammount ? (
            <FaStar key={i} onClick={onClick ? () => onClick(i + 1) : null} />
          ) : (
            <FaRegStar key={i} onClick={onClick ? () => onClick(i + 1) : null} />
          )
        )
      ) : (
        <p>S/D</p>
      )}
    </div>
  );
};

export default Stars;
