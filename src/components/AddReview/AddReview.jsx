import { forwardRef, useReducer } from "react";
import { useAuthContext } from "../../context/authContext";
import Stars from "../Stars/Stars";
import { FaRegUserCircle, FaRegCheckCircle } from "react-icons/fa";
import "./AddReview.css";
import ReviewTagSelect from "../ReviewTagSelect/ReviewTagSelect";

const AddReview = forwardRef((props, ref) => {
  const { currentUser } = useAuthContext();
  const [newReview, dispatchNewReview] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'setRating': return { ...state, rating: action.payload };
        case 'setTag': return { ...state, tag: action.payload};
        case 'setReview': return { ...state, review: action.payload}
        default: return state;
      }
    },
    { rating: 1, tag: null, review: "" }
  );

  const handleStarClick = (clickedStar) => {
    dispatchNewReview({ type: 'setRating', payload: clickedStar });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newReview);
  }

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
        onChange={(e) => dispatchNewReview({ type: 'setReview', payload: e.target.value })}
        value={newReview.review}
      ></textarea>

      <div className="addReviewFooter">
        {<p hidden={Boolean(newReview.tag)} className="selectedTag">{newReview.tag}</p>}
        <button type="submit" className="addReviewBtn">Enviar</button>
      </div>
    </form>
  );
});

export default AddReview;
