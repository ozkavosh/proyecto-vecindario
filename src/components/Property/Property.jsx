import { collection, getDoc, doc, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaMapMarkerAlt,
  FaPenSquare,
  FaRegCheckCircle,
  FaRegCommentDots,
  FaRegPaperPlane,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import { capitalizeString } from "../../utils/capitalizeString";
import { createChatWithUser } from "../../utils/createChatWithUser";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Review from "../Review/Review";
import Stars from "../Stars/Stars";
import "./Property.css";

const Property = ({ data }) => {
  const [propertyReviews, setPropertyReviews] = useState([]);
  const [owner, setOwner] = useState({});
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(data.owner){
      (async () => {
        const request = await getDoc(doc(db, "users", data.owner));
        const { uid, photoUrl, displayName } = request.data();
        setOwner({ uid, photoUrl, displayName });
      })();
    }
  }, [data.owner])

  useEffect(() => {
    if (data.reviews?.length) {
      (async () => {
        try {
          const request = await getDocs(
            query(collection(db, "reviews"), where("__name__", "in", data.reviews), limit(3))
          );
          setPropertyReviews(
            request.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .sort((a, b) => b.rating - a.rating)
          );
        } catch (e) {
          console.log(e);
        }
      })();
    } else {
      setPropertyReviews([]);
    }
  }, [data.reviews]);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.classList.toggle("deployed");
    e.target.classList.toggle("retract");
  };

  const handleNewReview = (e, id) => {
    e.preventDefault();
    navigate(`/inmueble/${id}`, { state: { newReviewClicked: true } });
  };

  const handleChat = async (e, owner) => {
    e.preventDefault();
    if (currentUser?.uid) {
      await createChatWithUser(currentUser, owner);
      dispatch({ type: "changeUser", payload: owner });
      navigate("/chat/messages");
    } else {
      navigate("/chat");
    }
  };

  return (
    <Link className="propertyLink" to={`/inmueble/${data.id}`}>
      <div className="property">
        <div className="propertyHeader">
          {owner.uid ? (
            <div className="propertyOwner">
              {owner.photoUrl ? (
                <img
                  src={owner.photoUrl}
                  alt={owner.displayName
                    ?.toUpperCase()
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                  className="propertyOwnerImg"
                />
              ) : (
                <img
                  src=""
                  alt={owner.displayName
                    ?.toUpperCase()
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                  className="propertyOwnerImg"
                />
              )}
              <h4 className="ownerName">{owner.displayName}</h4>
              <FaRegCheckCircle className="ownerCheck" />
            </div>
          ) : (
            <div className="propertyOwner">
              <Skeleton circle height={12} width={12} />
              <Skeleton height={12} width={65} />
              <Skeleton circle height={12} width={12} />
            </div>
          )}

          <Stars ammount={data.rating || 0} />
        </div>

        <Swiper
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="propertySlider"
        >
          {data?.images ? (
            data.images.map((image, id) => (
              <SwiperSlide key={id}>
                <img src={image} alt={`property${id}`} />
              </SwiperSlide>
            ))
          ) : (
            <>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
            </>
          )}
        </Swiper>

        <div className="propertyActions">
          {data.id ? (
            <div className="propertyOptions">
              <FavoriteButton pid={data.id} />
              <FaRegPaperPlane />
            </div>
          ) : (
            <div className="propertyOptions">
              <Skeleton circle height={24} width={24} />
              <Skeleton circle height={24} width={24} />
            </div>
          )}
          {data.id ? (
            currentUser?.uid !== owner.uid && (
              <div className="actionButtons">
                <button
                  type="button"
                  className="addReviewBtn"
                  onClick={(e) => handleChat(e, owner)}
                >
                  <FaRegCommentDots /> Chat
                </button>
                <button
                  type="button"
                  className="addReviewBtn"
                  onClick={(e) => handleNewReview(e, data.id)}
                >
                  <FaPenSquare /> Nueva reseña
                </button>
              </div>
            )
          ) : (
            <div className="actionButtons">
              <Skeleton width={35} />
              <Skeleton width={35} />
            </div>
          )}
        </div>

        <div className="propertyInfo">
          <div>
            <h3 className="propertyName">
              {(data.name && capitalizeString(data.name)) || <Skeleton width={165} />}
            </h3>
            <h4 className="propertyType">
              {(data.type && capitalizeString(data.type)) || <Skeleton width={165} />}
            </h4>
          </div>
          <div className="propertyLocation">
            <FaMapMarkerAlt />
            <p>{data.location?.toString() || <Skeleton width={165} />}</p>
          </div>
          {data.description ? (
            <p className="propertyDescription">
              {data.description.length > 240
                ? data.description.slice(0, 240) + "..."
                : data.description}
            </p>
          ) : (
            <Skeleton count={5} />
          )}
          <div className="reviews">
            <div className="propertyReviewsButton retract" onClick={handleClick}>
              Reseñas
              <FaChevronDown className="dropdown" />
            </div>
            <div className="reviews-list">
              {Boolean(propertyReviews.length) &&
                propertyReviews.map((review, index) => <Review key={index} data={review} />)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Property;
