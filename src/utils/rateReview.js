import { arrayRemove, arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const rateReview = async (currentUser, type, rid, state) => {
  try {
    const reviewRef = doc(db, "reviews", rid);
    if (!state.hasLiked && !state.hasDisliked && type === "like") {
      await updateDoc(reviewRef, {
        likeCount: increment(1),
        likedBy: arrayUnion(currentUser.uid),
      });
    }
    if (state.hasLiked && !state.hasDisliked && type === "like") {
      await updateDoc(reviewRef, {
        likeCount: increment(-1),
        likedBy: arrayRemove(currentUser.uid),
      });
    }

    if (state.hasLiked && !state.hasDisliked && type === "dislike") {
      await updateDoc(reviewRef, {
        likeCount: increment(-2),
        likedBy: arrayRemove(currentUser.uid),
        dislikedBy: arrayUnion(currentUser.uid),
      });
    }

    if (!state.hasDisliked && !state.hasLiked && type === "dislike") {
      await updateDoc(reviewRef, {
        likeCount: increment(-1),
        dislikedBy: arrayUnion(currentUser.uid),
      });
    }
    if (state.hasDisliked && !state.hasLiked && type === "dislike") {
      await updateDoc(reviewRef, {
        likeCount: increment(1),
        dislikedBy: arrayRemove(currentUser.uid),
      });
    }

    if (state.hasDisliked && !state.hasLiked && type === "like") {
      await updateDoc(reviewRef, {
        likeCount: increment(2),
        likedBy: arrayUnion(currentUser.uid),
        dislikedBy: arrayRemove(currentUser.uid),
      });
    }
  } catch (e) {
    console.log(e);
  }
};
