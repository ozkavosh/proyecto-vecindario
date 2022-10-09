import "./ProfileReview.css";
import { FaRegCommentAlt } from "react-icons/fa";
import RemoveReviewButton from "../RemoveReviewButton/RemoveReviewButton";

const ProfileReview = ({ data }) => {
  return (
    <article className="profile-review">
      <h3>
        <FaRegCommentAlt /> Reseña de sitio
      </h3>
      <div className="preview">
        <p>
          {data.review}
        </p>
        <button className="action">
          <RemoveReviewButton pid={data.property} rid={data.id} />
        </button>
      </div>
    </article>
  );
};

export default ProfileReview;
