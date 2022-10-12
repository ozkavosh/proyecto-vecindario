import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import RemoveReviewButton from "../RemoveReviewButton/RemoveReviewButton";
import "./ProfileReview.css";

const ProfileReview = ({ data }) => {
  const [propertyName, setPropertyName] = useState("Reseña de inmueble");

  useEffect(() => {
    const propertyQuery = doc(db, "properties", data.property);
    getDoc(propertyQuery)
      .then((doc) =>
        doc.data()
          ? setPropertyName(doc.data().name)
          : setPropertyName("Reseña de sitio")
      )
      .catch(console.log);
  }, [data.property]);

  return (
    <article className="profile-review">
      <Link to={`/inmueble/${data.property}`}>
        <h3>
          <FaRegCommentAlt /> {propertyName}
        </h3>
      </Link>
      <div className="preview">
        <p>{data.review}</p>
        <button className="action">
          <RemoveReviewButton pid={data.property} rid={data.id} />
        </button>
      </div>
    </article>
  );
};

export default ProfileReview;
