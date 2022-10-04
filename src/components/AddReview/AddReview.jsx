import { forwardRef, useReducer } from "react";
import { useAuthContext } from "../../context/authContext";
import Stars from "../Stars/Stars";
import { FaRegUserCircle, FaRegCheckCircle } from "react-icons/fa";
import "./AddReview.css";
import ReviewTagSelect from "../ReviewTagSelect/ReviewTagSelect";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { updatePropertyRating } from "../../utils/updatePropertyRating";

const AddReview = forwardRef(({pid}, ref) => {
  const { currentUser } = useAuthContext();
  const [newReview, dispatchNewReview] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setRating":
          return { ...state, rating: action.payload };
        case "setTag":
          return { ...state, tag: action.payload };
        case "setReview":
          return { ...state, review: action.payload };
        case "clear":
          return { review: "", tag: null, rating: 1};
        default:
          return state;
      }
    },
    { rating: 1, tag: null, review: "" }
  );

  const handleStarClick = (clickedStar) => {
    dispatchNewReview({ type: "setRating", payload: clickedStar });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await addDoc(collection(db, "reviews"), {
        ...newReview,
        createdAt: serverTimestamp(),
        reviewer: {
          displayName: currentUser.displayName,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL || "",
        },
        property: pid
      });

      const newId = request.id;

      await updateDoc(doc(db, "properties", pid), { reviews: arrayUnion(newId) });
      await updateDoc(doc(db, "users", currentUser.uid), { reviews: arrayUnion(newId) });
      await updatePropertyRating(pid);
    
      dispatchNewReview({ type: "clear" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form ref={ref} className="addReview" onSubmit={handleSubmit}>
      <div className="reviewHeader">
        <div className="reviewer">
          <FaRegUserCircle className="reviewerImg" />
          <h4 className="reviewerName">{currentUser?.displayName}</h4>
          <FaRegCheckCircle className="reviewerCheck" />
        </div>

        <ReviewTagSelect dispatch={dispatchNewReview} />

        <Stars onClick={handleStarClick} amount={newReview.rating} />
      </div>

      <textarea
        name="reviewContent"
        className="reviewContent"
        placeholder="Describe tu experiencia"
        onChange={(e) =>
          dispatchNewReview({ type: "setReview", payload: e.target.value })
        }
        value={newReview.review}
      ></textarea>

      <div className="addReviewFooter">
        {
          <p hidden={Boolean(newReview.tag)} className="selectedTag">
            {newReview.tag}
          </p>
        }
        <button
          type="submit"
          className="addReviewBtn"
          disabled={!newReview.tag || !newReview.rating || !newReview.review}
        >
          Enviar
        </button>
      </div>
    </form>
  );
});

export default AddReview;
