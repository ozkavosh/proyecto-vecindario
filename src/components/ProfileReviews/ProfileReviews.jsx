import "./ProfileReviews.css";
import { FaFilter, FaRegCommentAlt, FaSearch } from "react-icons/fa";
import ProfileReviewsList from "../ProfileReviewsList/ProfileReviewsList";

const ProfileReviews = () => {
  return (
    <section className="profile-reviews">
      <h1>
        <FaRegCommentAlt /> Reseñas
      </h1>
      <hr />
      <section>
        <div className="searchbar">
          <FaSearch />
          <input type="text" />
          <FaFilter />
        </div>
        <ProfileReviewsList />
      </section>
    </section>
  );
};

export default ProfileReviews;
