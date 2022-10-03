import { useState, useEffect, useRef } from "react";
import "./PropertyDetail.css";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaRegUserCircle,
  FaRegCheckCircle,
  FaRegPaperPlane,
  FaPenSquare,
  FaMapMarkerAlt,
  FaChevronDown,
  FaListUl,
  FaTasks,
} from "react-icons/fa";
import { BiMessageEdit } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Review from "../Review/Review";
import Stars from "../Stars/Stars";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import AddReview from "../AddReview/AddReview";

const PropertyDetail = () => {
  const [property, setProperty] = useState({});
  const [propertyReviews, setPropertyReviews] = useState([]);
  const reviewsRef = useRef();
  const addReviewInputRef = useRef();
  const { pid } = useParams();

  useEffect(() => {
    if (pid) {
      (async () => {
        try {
          const request = await getDoc(doc(db, "properties", pid));
          setProperty({ ...request.data(), id: request.id });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [pid]);

  useEffect(() => {
    //Get property reviews inside propertyReviews collection search by propertyId
    if (property?.id) {
      (async () => {
        try {
          //Getting ALL reviews is pretty expensive memory wise, probably different approach / db structure ?
          const request = await getDoc(doc(db, "propertyReviews", property.id));
          if (request.exists()) {
            setPropertyReviews(Object.values(request.data()));
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [property?.id]);

  const deployReviews = () => {
    reviewsRef.current.classList.toggle("deployed");
    reviewsRef.current.classList.toggle("retract");
  };

  const handleAddReview = () => {
    if(!reviewsRef.current.classList.contains("deployed")){
      deployReviews();
      setTimeout(() => addReviewInputRef.current.scrollIntoView({ behavior: "smooth"}), 500);
    }else{
      addReviewInputRef.current.scrollIntoView({ behavior: "smooth"});
    }
  }

  return (
    <div className="property detail">
      <div className="propertyHeader">
        <div className="propertyOwner">
          <FaRegUserCircle className="ownerImg" />
          <h4 className="ownerName">{property.owner?.displayName}</h4>
          <FaRegCheckCircle className="ownerCheck" />
        </div>

        <Stars amount={property.rating} />
      </div>

      <div className="propertyImgContainer">
        <Swiper
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="propertySlider"
        >
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
        <div className="chatBtn">
          <BsChatDots /> Chat
        </div>
      </div>

      <div className="propertyActions">
        <div className="propertyOptions">
          <FavoriteButton pid={property.id} />
          <FaRegPaperPlane />
        </div>
        <button type="button" className="addReviewBtn" onClick={handleAddReview}>
          <FaPenSquare /> Nueva reseña
        </button>
      </div>

      <div className="propertyInfo">
        <h3 className="propertyType">{property.type?.toUpperCase()}</h3>
        <div className="propertyLocation">
          <FaMapMarkerAlt />
          <p>{property?.location?.toString()}</p>
        </div>
        <p className="propertyDescription">
          {property?.description?.length > 240
            ? property?.description?.slice(0, 240) + "..."
            : property?.description}
        </p>

        <div className="propertySpecs">
          <h3 className="propertySpecsTitle">
            <FaListUl /> Características
          </h3>
        </div>

        <div className="propertyRules">
          <h3 className="propertyRulesTitle">
            <FaTasks /> Normas de la casa <FaChevronDown />
          </h3>
        </div>

        <div className="reviews">
          <div
            className="propertyReviewsButton retract"
            ref={reviewsRef}
            onClick={deployReviews}
          >
            <BiMessageEdit />
            Reseñas
            <FaChevronDown className="dropdown" />
          </div>
          <div className="reviews-list">
            {propertyReviews.map((review, id) => (
              <Review key={id} data={review} />
            ))}

            <AddReview ref={addReviewInputRef}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
