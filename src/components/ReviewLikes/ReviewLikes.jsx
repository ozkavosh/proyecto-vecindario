import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { db } from "../../firebase/config";
import "./ReviewLikes.css";

const ReviewLikes = ({ rid }) => {
  const [likeCount, setLikeCount] = useState(null);
  const reviewRating = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "reviews", rid), async (doc) => {
      setLikeCount(Number(doc.data().likeCount));
    });

    return () => unsub();
  }, [rid]);

  const rateReview = (type) => {
    if (type === "like") {
      if (reviewRating.current.classList.contains("neutral")) {
        reviewRating.current.classList.remove("neutral");
        reviewRating.current.classList.add("liked");
        setLikeCount(likeCount + 1);
      } else if (reviewRating.current.classList.contains("liked")) {
        reviewRating.current.classList.add("neutral");
        reviewRating.current.classList.remove("liked");
        setLikeCount(likeCount - 1);
      } else if (reviewRating.current.classList.contains("disliked")) {
        reviewRating.current.classList.remove("disliked");
        reviewRating.current.classList.add("liked");
        setLikeCount(likeCount + 1);
      }
    } else if (type === "dislike") {
      if (reviewRating.current.classList.contains("neutral")) {
        reviewRating.current.classList.remove("neutral");
        reviewRating.current.classList.add("disliked");
        setLikeCount(likeCount - 1);
      } else if (reviewRating.current.classList.contains("disliked")) {
        reviewRating.current.classList.add("neutral");
        reviewRating.current.classList.remove("disliked");
        setLikeCount(likeCount + 1);
      } else if (reviewRating.current.classList.contains("liked")) {
        reviewRating.current.classList.add("disliked");
        reviewRating.current.classList.remove("liked");
        setLikeCount(likeCount - 1);
      }
    }
    updateDB();
  };

  const updateDB = async () => {
    //TODO: like count doesnt add correctly
    const reviewRef = doc(db, "reviews", rid);
    await updateDoc(reviewRef, {
      likeCount: likeCount,
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
