import "./ProfileReviewsList.css";
import { useState, useEffect } from "react";
import ProfileReview from "../ProfileReview/ProfileReview";
import { useAuthContext } from "../../context/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProfileReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
      if (currentUser?.reviews?.length) {
        (async() => {
          try {
            const request = await getDocs(
              query(
                collection(db, "reviews"),
                where("__name__", "in", currentUser.reviews)
              )
            );
  
            setReviews(
              request.docs
                .map((doc) => ({...doc.data(), id: doc.id}))
                .sort((a, b) => b.rating - a.rating)
            );
          } catch (e) {
            console.log(e);
          }
        })();
      } else{
        setReviews([]);
      }
  }, [currentUser?.reviews]);

  return (
    <div className="list">
      {reviews.map(review => (
        <ProfileReview data={review} key={review.id} />
      ))}
    </div>
  );
};

export default ProfileReviewsList;
