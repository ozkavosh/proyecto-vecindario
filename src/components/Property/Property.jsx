import "./Property.css";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaRegUserCircle,
  FaRegCheckCircle ,
  FaRegHeart,
  FaRegPaperPlane,
  FaPenSquare,
  FaMapMarkerAlt,
  FaChevronDown
} from "react-icons/fa";
import { BiMessageEdit } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import Stars from "../Stars/Stars";

const Property = ({ data }) => {
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
          <FaMapMarkerAlt/>
          <p>{data.location}</p>
        </div>
        <p className="propertyDescription">{data.description.length > 240 ? data.description.slice(0,240) + "..." : data.description}</p>
        <div className="propertyReviewsButton">
          <BiMessageEdit/>
          Reseñas
          <FaChevronDown/>
        </div>
      </div>
    </div>
  );
};

export default Property;
