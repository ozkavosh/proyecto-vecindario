import "./Review.css";
import { FaRegUserCircle, FaRegCheckCircle, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import Stars from "../Stars/Stars";

const Review = ({ data }) => {
  return (
    <div className="review">
      <div className="reviewHeader">
        <div className="reviewer">
          <FaRegUserCircle className="reviewerImg" />
          <h4 className="reviewerName">{data.reviewer.displayName}</h4>
          <FaRegCheckCircle className="reviewerCheck" />
        </div>

        <Stars amount={data.rating} />
      </div>

      <div className="reviewBody">
        <p>
          {data.review.length > 120
            ? data.review.slice(0, 120) + "..."
            : data.review}
        </p>
      </div>

      <div className="reviewFooter">
        <div className="reviewInfo">
            <p className="reviewTag">{data.tag}</p>
            <p className="reviewDate">{data.createdAt.toDate().toLocaleDateString()}</p>
        </div>

        <div className="reviewActions">
          <FaRegThumbsUp/>
          <FaRegThumbsDown/>
        </div>
      </div>
    </div>
  );
};

export default Review;
