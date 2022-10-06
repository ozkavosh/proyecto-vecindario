import "./ReviewLikes.css";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { db } from "../../firebase/config";
import reviewLikes from "../../reducers/reviewLikes";
import { rateReview } from "../../utils/rateReview";

const ReviewLikes = ({ rid }) => {
  const { currentUser } = useAuthContext();
  const [state, dispatch] = useReducer(
    reviewLikes.reducer,
    reviewLikes.initialState
  );

  useEffect(() => {
    if (rid && currentUser.uid) {
      const unsub = onSnapshot(doc(db, "reviews", rid), (document) => {
        const { likeCount, likedBy, dislikedBy } = document.data();

        const hasLiked = likedBy.includes(currentUser.uid);
        const hasDisliked = dislikedBy.includes(currentUser.uid);

        dispatch({
          type: "updateLikes",
          payload: { likeCount, hasLiked, hasDisliked },
        });
      });

      return () => unsub();
    }
  }, [rid, currentUser.uid]);

  const handleClick = (type) => {
    rateReview(currentUser, type, rid, state);
  };

  return (
    currentUser.uid && (
      <div className="review-likes neutral">
        <button onClick={() => handleClick("like")}>
          {state.hasLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </button>
        <button onClick={() => handleClick("dislike")}>
          {state.hasDisliked ? <FaThumbsDown /> : <FaRegThumbsDown />}
        </button>
        <p className="review-rating">{state?.likeCount}</p>
      </div>
    )
  );
};

export default ReviewLikes;
