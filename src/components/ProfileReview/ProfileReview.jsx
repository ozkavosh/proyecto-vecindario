import { FaEraser, FaRegCommentAlt } from "react-icons/fa";
import "./ProfileReview.css";

const ProfileReview = () => {
  return (
    <article className="review">
      <h3>
        <FaRegCommentAlt /> Reseña de sitio
      </h3>
      <div className="preview">
        <p>
          Ipsum dolor dolore tempor exercitation do non quis tempor excepteur ex culpa minim est do.
          Laboris nostrud ea occaecat enim aliqua nulla sunt ut. Aliqua id eu quis cupidatat non.
          Reprehenderit pariatur dolore reprehenderit aliqua adipisicing deserunt cillum. Labore
          mollit aute tempor duis ut est aliquip reprehenderit. Amet veniam et ex duis ea ea sint
          Lorem labore eu do dolor. Amet consectetur quis ex occaecat sint.
        </p>
        <button className="action">
          <FaEraser />
        </button>
      </div>
    </article>
  );
};

export default ProfileReview;
