import "./AddReview.css";
import { forwardRef, useReducer, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import Stars from "../Stars/Stars";
import { ReactComponent as UserIcon} from '../../assets/icon/UserOutline.svg';
import { FaRegCheckCircle } from "react-icons/fa";
import ReviewTagSelect from "../ReviewTagSelect/ReviewTagSelect";
import newReviewReducer from "../../reducers/newReview";
import { addReview } from "../../utils/addReview";

const AddReview = forwardRef(({ pid }, ref) => {
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [newReview, dispatchNewReview] = useReducer(
    newReviewReducer.reducer,
    newReviewReducer.initialState
  );

  const handleStarClick = (clickedStar) => {
    dispatchNewReview({ type: "setRating", payload: clickedStar });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await addReview(newReview, dispatchNewReview, currentUser, pid);
    setLoading(false);
  };

  return (
    <form ref={ref} className="addReview" onSubmit={handleSubmit}>
      <div className="reviewHeader">
        <div className="reviewer">
          <UserIcon className="reviewerImg" />
          <h4 className="reviewerName">{currentUser?.displayName} <FaRegCheckCircle className="reviewerCheck" /></h4>
        </div>

        <div className="newReviewInputs">
          <ReviewTagSelect dispatch={dispatchNewReview} />
          <Stars onClick={handleStarClick} ammount={newReview.rating} />
        </div>
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
          disabled={!newReview.tag || !newReview.rating || !newReview.review || loading}
        >
          Enviar
        </button>
      </div>
    </form>
  );
});

export default AddReview;
