import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { db } from "../../firebase/config";
import RemoveReviewButton from "../RemoveReviewButton/RemoveReviewButton";
import ReviewLikes from "../ReviewLikes/ReviewLikes";
import Stars from "../Stars/Stars";
import "./Review.css";

const Review = ({ data }) => {
  const { currentUser } = useAuthContext();
  const [reviewer, setReviewer] = useState({});

  useEffect(() => {
    if (data.reviewer)
      (async () => {
        const request = await getDoc(doc(db, "users", data.reviewer));
        const { uid, photoUrl, displayName } = request.data();
        setReviewer({ uid, photoUrl, displayName });
      })();
  }, [data.reviewer]);

  return (
    reviewer.displayName && (
      <div className="review">
        {reviewer.photoUrl ? (
          <img
            src={reviewer.photoUrl}
            alt={reviewer.displayName
              ?.toUpperCase()
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
            className="reviewerImg"
          />
        ) : (
          <div className="reviewerImg">
            <p>{reviewer.displayName
              ?.toUpperCase()
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}</p>
          </div>
        )}
        <div className="reviewContainer">
          <div className="reviewHeader">
            <div className="reviewer">
              <h4 className="reviewerName">{reviewer.displayName}</h4>
              <FaRegCheckCircle className="reviewerCheck" />
            </div>

            <Stars ammount={data.rating} />
          </div>

          <div className="reviewBody">
            <p>{data.review}</p>
          </div>

          <div className="reviewFooter">
            <div className="reviewInfo">
              {reviewer.uid && (
                <ReviewLikes reviewer={reviewer.uid} rid={data.id} />
              )}
              <p className="reviewTag">{data.tag}</p>
              <p className="reviewDate">
                {data.createdAt.toDate().toLocaleDateString()}
              </p>
            </div>

            <div className="reviewActions">
              {data.id && data.reviewer?.uid === currentUser?.uid && (
                <RemoveReviewButton rid={data.id} pid={data.property} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Review;
