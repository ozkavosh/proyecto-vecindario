import { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import "./ReviewLikes.css";

const ReviewLikes = () => {
  const [rating, setRating] = useState(null);
  return (
    <div className="review-likes">
      <FaRegThumbsUp />
      <FaRegThumbsDown />
      {rating ? <p className="review-rating">{rating}</p> : <></>}
    </div>
  );
};

export default ReviewLikes;
