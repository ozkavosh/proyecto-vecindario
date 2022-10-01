import { useState } from "react";
import ProfileReview from "../ProfileReview/ProfileReview";
import "./ProfileReviewsList.css";

const ProfileReviewsList = () => {
  const [reviews, setReviews] = useState([0, 1, 2, 3, 4, 5]);
  return (
    <div className="list">
      {reviews.map((review, i) => (
        <ProfileReview key={review[i]} />
      ))}
    </div>
  );
};

export default ProfileReviewsList;
