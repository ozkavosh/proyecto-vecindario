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
import { Navigation } from "swiper";
import Review from "../Review/Review";
import Stars from "../Stars/Stars";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Property = ({ data }) => {
  // const [showReviews, setShowReviews] = useState(false);
  const [propertyReviews, setPropertyReviews] = useState([]);

  useEffect(() => {
    //Get property reviews inside propertyReviews collection search by propertyId
    (async () => {
      try {
        //Getting ALL reviews is pretty expensive memory wise, probably different approach / db structure ?
        const request = await getDoc(doc(db, "propertyReviews", data.id));
        if (request.exists()) {
          //Sort reviews higher to lower by rating
          setPropertyReviews(Object.values(request.data()).sort((a,b) => b.rating - a.rating));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [data.id]);

  const handleClick = (e) => {
    //TODO: this became useless after some workarounds
    //kept it just in case it is useful later

    // setShowReviews((prev) => !prev);
    e.target.classList.toggle("deployed");
    e.target.classList.toggle("retract");
  };

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

      <div className="propertyActions">
        <div className="propertyOptions">
          <FaRegHeart />
          <FaRegPaperPlane />
        </div>
        <button type="button" className="addReviewBtn">
          <FaPenSquare /> Nueva reseña
        </button>
      </div>

      <div className="propertyInfo">
        <h3 className="propertyType">{data.type.toUpperCase()}</h3>
        <div className="propertyLocation">
          <FaMapMarkerAlt />
          <p>{data.location.toString()}</p>
        </div>
        <p className="propertyDescription">
          {data.description.length > 240
            ? data.description.slice(0, 240) + "..."
            : data.description}
        </p>
        <div className="reviews">
          <div className="propertyReviewsButton retract" onClick={handleClick}>
            <BiMessageEdit />
            Reseñas
            <FaChevronDown className="dropdown" />
          </div>
          <div className="reviews-list">
            {/*Show up to 3 reviews only*/}
            {Boolean(propertyReviews.length) &&
              [...Array(3)].map((_, index) =>
                propertyReviews[index] ? (
                  <Review key={index} data={propertyReviews[index]} />
                ) : (
                  <></>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
