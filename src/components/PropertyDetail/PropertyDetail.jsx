import { collection, doc, getDocs, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiMessageEdit } from "react-icons/bi";
import {
  FaChevronDown,
  FaListUl,
  FaMapMarkerAlt,
  FaPenSquare,
  FaRegCheckCircle,
  FaRegCommentDots,
  FaRegPaperPlane,
  FaTasks,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import { capitalizeString } from "../../utils/capitalizeString";
import { createChatWithUser } from "../../utils/createChatWithUser";
import AddReview from "../AddReview/AddReview";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Review from "../Review/Review";
import Stars from "../Stars/Stars";
import "./PropertyDetail.css";

const PropertyDetail = ({ setDismount }) => {
  const navigate = useNavigate();
  const { dispatch } = useChatContext();
  const { currentUser } = useAuthContext();
  const [ owner, setOwner ] = useState({});
  const [property, setProperty] = useState({});
  const [propertyReviews, setPropertyReviews] = useState([]);
  const reviewsRef = useRef();
  const addReviewInputRef = useRef();
  const location = useLocation();
  const { pid } = useParams();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, header: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, header: false }));
  }, [setDismount]);

  const handleAddReview = useCallback(() => {
    if (currentUser) {
      if (!reviewsRef.current.classList.contains("deployed")) {
        deployReviews();
        setTimeout(() => addReviewInputRef.current.scrollIntoView({ behavior: "smooth" }), 500);
      } else {
        addReviewInputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/inmueble/error");
    }
  }, [currentUser, navigate]);

  const handleChat = async (owner) => {
    if (currentUser?.uid) {
      await createChatWithUser(currentUser, owner);
      dispatch({ type: "changeUser", payload: owner });
      navigate("/chat/messages");
    } else {
      navigate("/chat");
    }
  };

  const deployReviews = () => {
    reviewsRef.current.classList.toggle("deployed");
    reviewsRef.current.classList.toggle("retract");
  };

  useEffect(() => {
    if (pid) {
      const unsub = onSnapshot(doc(db, "properties", pid), async (document) => {
        if(!document.exists()) return navigate("/404", { replace: true });
        setProperty(document.data());

        if(!owner.displayName){
          const requestProfile = await getDoc(doc(db, "users", document.data().owner));
          const { uid, photoUrl, displayName } = requestProfile.data();
          setOwner({ uid, photoUrl, displayName });
        }

        if (document.data().reviews.length) {
          try {
            const request = await getDocs(
              query(collection(db, "reviews"), where("__name__", "in", document.data().reviews))
            );

            setPropertyReviews(
              request.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .sort((a, b) => b.rating - a.rating)
            );
          } catch (e) {
            console.log(e);
          }
        } else {
          setPropertyReviews([]);
        }
      });

      return () => unsub();
    }
  }, [pid, owner.displayName, navigate]);

  useEffect(() => {
    if (currentUser && location.state?.newReviewClicked) {
      handleAddReview();
    } else if (!currentUser && location.state?.newReviewClicked) {
      navigate("/inmueble/error");
    }
  }, [location.state?.newReviewClicked, handleAddReview, currentUser, navigate]);

  return (
    <div className="property detail">
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

        <Stars ammount={property.rating || 0} />
      </div>

      <div className="propertyImgContainer">
        <Swiper
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="propertySlider"
        >
          {property?.images ? (
            property.images.map((image, id) => (
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
      </div>

      <div className="propertyActions">
        {pid ? (
          <div className="propertyOptions">
            <FavoriteButton pid={pid} />
            <FaRegPaperPlane />
          </div>
        ) : (
          <div className="propertyOptions">
            <Skeleton circle height={24} width={24} />
            <Skeleton circle height={24} width={24} />
          </div>
        )}
        {owner.uid ? (
          owner.uid !== currentUser?.uid && (
            <div className="actionButtons">
              <button
                type="button"
                className="addReviewBtn"
                onClick={() => handleChat(owner)}
              >
                <FaRegCommentDots /> Chat
              </button>
              <button type="button" className="addReviewBtn" onClick={handleAddReview}>
                <FaPenSquare /> Nueva rese??a
              </button>
            </div>
          )
        ) : (
          <div className="actionButtons">
            <Skeleton width={45} />
            <Skeleton width={45} />
          </div>
        )}
      </div>

      <div className="propertyInfo">
        <div>
          <h3 className="propertyName">
            {(property.name && capitalizeString(property.name)) || <Skeleton width={165} />}
          </h3>
          <h4 className="propertyType">
            {(property.type && capitalizeString(property.type)) || <Skeleton width={165} />}
          </h4>
        </div>
        <div className="propertyLocation">
          <FaMapMarkerAlt />
          <p>{property?.location?.toString() || <Skeleton width={165} />}</p>
        </div>
        {property.description ? (
          <p className="propertyDescription">
            {property?.description?.length > 240
              ? property?.description?.slice(0, 240) + "..."
              : property?.description}
          </p>
        ) : (
          <Skeleton count={5} />
        )}

        <div className="propertySpecs">
          <h3 className="propertySpecsTitle">
            <FaListUl /> Caracter??sticas
          </h3>
        </div>

        <div className="propertyRules">
          <h3 className="propertyRulesTitle">
            <FaTasks /> Normas de la casa <FaChevronDown />
          </h3>
        </div>

        <div className="reviews">
          <div className="propertyReviewsButton retract" ref={reviewsRef} onClick={deployReviews}>
            <BiMessageEdit />
            Rese??as
            <FaChevronDown className="dropdown" />
          </div>
          <div className="reviews-list">
            {propertyReviews.map((review, id) => (
              <Review key={id} data={review} />
            ))}

            {currentUser && pid && currentUser?.uid !== owner.uid && (
              <AddReview pid={pid} ref={addReviewInputRef} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
