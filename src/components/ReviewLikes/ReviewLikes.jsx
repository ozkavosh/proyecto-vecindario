import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { db } from "../../firebase/config";
import "./ReviewLikes.css";

const ReviewLikes = ({ rid }) => {
  const reviewRating = useRef(null);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (rid) {
      const unsub = onSnapshot(doc(db, "reviews", rid), (document) => {
        setLikeCount(document.data().likeCount);
      });

      return () => unsub();
    }
  }, [rid]);

  const rateReview = (type) => {
    if (type === "like") {
      if (reviewRating.current.classList.contains("neutral")) {
        reviewRating.current.classList.remove("neutral");
        reviewRating.current.classList.add("liked");
      } else if (reviewRating.current.classList.contains("liked")) {
        reviewRating.current.classList.add("neutral");
        reviewRating.current.classList.remove("liked");
      } else if (reviewRating.current.classList.contains("disliked")) {
        reviewRating.current.classList.remove("disliked");
        reviewRating.current.classList.add("liked");
      }
    } else if (type === "dislike") {
      if (reviewRating.current.classList.contains("neutral")) {
        reviewRating.current.classList.remove("neutral");
        reviewRating.current.classList.add("disliked");
      } else if (reviewRating.current.classList.contains("disliked")) {
        reviewRating.current.classList.add("neutral");
        reviewRating.current.classList.remove("disliked");
      } else if (reviewRating.current.classList.contains("liked")) {
        reviewRating.current.classList.add("disliked");
        reviewRating.current.classList.remove("liked");
      }
    }
    updateDB(type);
  };

  const updateDB = async (type) => {
    const reviewRef = doc(db, "reviews", rid);
    await updateDoc(reviewRef, {
      likeCount: increment(type === "like" ? 1 : -1),
    });
  };

  return (
    <div className="review-likes neutral" ref={reviewRating}>
      <button onClick={() => rateReview("like")} className="like">
        <FaRegThumbsUp className="outlined" />
        <FaThumbsUp className="filled" />
      </button>
      <button onClick={() => rateReview("dislike")} className="dislike">
        <FaRegThumbsDown className="outlined" />
        <FaThumbsDown className="filled" />
      </button>
      {likeCount ? <p className="review-rating">{likeCount}</p> : <></>}
    </div>
  );
};

export default ReviewLikes;
