import "./Property.css";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaRegUserCircle,
  FaRegCheckCircle,
  FaRegHeart,
  FaRegPaperPlane,
  FaPenSquare,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
import { BiMessageEdit } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "../Review/Review";
import Stars from "../Stars/Stars";
import { useState } from "react";

const Property = ({ data }) => {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="property">
      <div className="propertyHeader">
        <div className="propertyOwner">
          <FaRegUserCircle className="ownerImg" />
          <h4 className="ownerName">{data.owner.displayName}</h4>
          <FaRegCheckCircle className="ownerCheck" />
        </div>

        <Stars amount={data.rating} />
      </div>

      <Swiper slidesPerView={1} navigation className="propertySlider">
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>

      <div className="propertyActions">
        <div className="propertyOptions">
          <FaRegHeart />
          <FaRegPaperPlane />
        </div>
        <button type="button" className="addReviewBtn">
          <FaPenSquare/> Nueva reseña
        </button>
      </div>

      <div className="propertyInfo">
        <h3 className="propertyType">{data.type.toUpperCase()}</h3>
        <div className="propertyLocation">
          <FaMapMarkerAlt />
          <p>{data.location}</p>
        </div>
        <p className="propertyDescription">
          {data.description.length > 240
            ? data.description.slice(0, 240) + "..."
            : data.description}
        </p>
        <div
          className="propertyReviewsButton"
          onClick={() => setShowReviews((prev) => !prev)}
        >
          <BiMessageEdit />
          Reseñas
          <FaChevronDown />
        </div>
      </div>

      {showReviews && <div className="reviews">
            {data.reviews.map(data => <Review key={data.id} data={data}/>)}
        </div>}
    </div>
  );
};

export default Property;
