import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { updatePropertyRating } from "../utils/updatePropertyRating";

export const addReview = async (
  newReview,
  dispatchNewReview,
  currentUser,
  pid
) => {
  try {
    const request = await addDoc(collection(db, "reviews"), {
      ...newReview,
      createdAt: serverTimestamp(),
      likedBy: [],
      dislikedBy: [],
      reviewer: {
        displayName: currentUser.displayName,
        uid: currentUser.uid,
        photoURL: currentUser.photoURL || "",
      },
      property: pid,
    });

    const newId = request.id;

    await updateDoc(doc(db, "properties", pid), {
      reviews: arrayUnion(newId),
    });
    await updateDoc(doc(db, "users", currentUser.uid), {
      reviews: arrayUnion(newId),
    });
    await updatePropertyRating(pid);

    dispatchNewReview({ type: "clear" });
  } catch (e) {
    console.log(e);
  }
};
