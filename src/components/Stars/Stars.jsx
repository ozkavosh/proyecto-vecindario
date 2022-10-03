import { FaStar, FaRegStar } from "react-icons/fa";
import "./Stars.css";

const Stars = ({ amount, onClick }) => {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) =>
        i < amount ? (
          <FaStar key={i} onClick={onClick ? () => onClick(i+1) : null} />
        ) : (
          <FaRegStar key={i} onClick={onClick ? () => onClick(i+1) : null} />
        )
      )}
    </div>
  );
};

export default Stars;
