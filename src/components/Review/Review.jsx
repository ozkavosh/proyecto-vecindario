import { FaRegCheckCircle, FaRegUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import RemoveReviewButton from "../RemoveReviewButton/RemoveReviewButton";
import ReviewLikes from "../ReviewLikes/ReviewLikes";
import Stars from "../Stars/Stars";
import "./Review.css";

const Review = ({ data }) => {
  const { currentUser } = useAuthContext();

  return (
    <div className="review">
      <FaRegUserCircle className="reviewerImg" />
      <div className="reviewContainer">
        <div className="reviewHeader">
          <div className="reviewer">
            <h4 className="reviewerName">{data.reviewer.displayName}</h4>
            <FaRegCheckCircle className="reviewerCheck" />
          </div>

          <Stars ammount={data.rating} />
        </div>

        <div className="reviewBody">
          <p>{data.review}</p>
        </div>

        <div className="reviewFooter">
          <div className="reviewInfo">
            {data.reviewer?.uid && <ReviewLikes reviewer={data.reviewer.uid} rid={data.id} />}
            <p className="reviewTag">{data.tag}</p>
            <p className="reviewDate">{data.createdAt.toDate().toLocaleDateString()}</p>
          </div>

          <div className="reviewActions">
            {data.id && data.reviewer?.uid === currentUser?.uid && (
              <RemoveReviewButton rid={data.id} pid={data.property} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
