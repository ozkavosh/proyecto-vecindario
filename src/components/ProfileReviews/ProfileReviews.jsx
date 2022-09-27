import { useEffect } from "react";
import { FaFilter, FaRegCommentAlt, FaSearch } from "react-icons/fa";
import ProfileReviewsList from "../ProfileReviewsList/ProfileReviewsList";
import "./ProfileReviews.css";

const ProfileReviews = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

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
