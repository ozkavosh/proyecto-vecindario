import "./Review.css";
import { FaRegUserCircle, FaRegCheckCircle, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import Stars from "../Stars/Stars";
import RemoveReviewButton from "../RemoveReviewButton/RemoveReviewButton";

const Review = ({ data }) => {
  const { currentUser } = useAuthContext();
  console.log(data);
  return (
    <div className="review">
      <div className="reviewHeader">
        <div className="reviewer">
          <FaRegUserCircle className="reviewerImg" />
          <h4 className="reviewerName">{data.reviewer.displayName}</h4>
          <FaRegCheckCircle className="reviewerCheck" />
        </div>

        <Stars ammount={data.rating} />
      </div>

      <div className="reviewBody">
        <p>{data.review.length > 120 ? data.review.slice(0, 120) + "..." : data.review}</p>
      </div>

      <div className="reviewFooter">
        <div className="reviewInfo">
          <p className="reviewTag">{data.tag}</p>
          <p className="reviewDate">{data.createdAt.toDate().toLocaleDateString()}</p>
        </div>

        <div className="reviewActions">
          {data.id && data.reviewer?.uid === currentUser?.uid ? (
            <RemoveReviewButton rid={data.id} pid={data.property} />
          ) : (
            data.reviewer?.uid !== currentUser?.uid && (
              <>
                <FaRegThumbsUp />
                <FaRegThumbsDown />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
