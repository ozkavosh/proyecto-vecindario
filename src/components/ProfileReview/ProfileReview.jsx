import "./ProfileReview.css";
import { FaRegCommentAlt } from "react-icons/fa";
import RemoveReviewButton from "../RemoveReviewButton/RemoveReviewButton";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase/config";

const ProfileReview = ({ data }) => {
  console.log(data.property);

  useEffect(() => {
    //TODO: title of review
    /* const docRef = doc(db, "properties", data.property);
    const docSnap = getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    } */

    return () => {};
  }, []);

  return (
    <article className="profile-review">
      <h3>
        <FaRegCommentAlt /> Reseña de sitio
      </h3>
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
