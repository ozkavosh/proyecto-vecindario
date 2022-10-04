import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const updatePropertyRating = async (pid) => {
  try {
    const requestProperty = await getDoc(doc(db, "properties", pid));
    const reviews = requestProperty.data().reviews;
    const requestReviews = await getDocs(
      query(collection(db, "reviews"), where("__name__", "in", reviews))
    );
    const reviewsRating = requestReviews.docs
      .map((doc) => doc.data().rating)
      .reduce((a, r) => a + r, 0);
    await updateDoc(doc(db, "properties", pid), {
      rating: reviews.length ? Math.round(reviewsRating / reviews.length) : 0,
    });
  } catch (e) {
    console.log(e);
  }
};
