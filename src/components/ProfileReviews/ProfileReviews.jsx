import { useEffect } from "react";
import { FaFilter, FaRegCommentAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import ProfileReviewsList from "../ProfileReviewsList/ProfileReviewsList";
import "./ProfileReviews.css";

const ProfileReviews = ({ setDismount }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  console.log("hola");

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);
  if (!currentUser) {
    return navigate("/perfil");
  }

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
