import "./Property.css";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaRegUserCircle,
  FaRegCheckCircle,
  FaRegPaperPlane,
  FaPenSquare,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Review from "../Review/Review";
import Stars from "../Stars/Stars";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const Property = ({ data }) => {
  const [propertyReviews, setPropertyReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.reviews?.length) {
      (async () => {
        try {
          const request = await getDocs(
            query(
              collection(db, "reviews"),
              where("__name__", "in", data.reviews)
            )
          );
          //Sort reviews higher to lower by rating
          setPropertyReviews(
            request.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .sort((a, b) => b.rating - a.rating)
          );
        } catch (e) {
          console.log(e);
        }
      })();
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

  return (
    <Link className="propertyLink" to={`/inmueble/${data.id}`}>
      <div className="property">
        <div className="propertyHeader">
          {data.owner ? (
            <div className="propertyOwner">
              <FaRegUserCircle className="ownerImg" />
              <h4 className="ownerName">{data.owner.displayName}</h4>
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
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
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
            <button
              type="button"
              className="addReviewBtn"
              onClick={(e) => handleNewReview(e, data.id)}
            >
              <FaPenSquare /> Nueva reseña
            </button>
          ) : (
            <Skeleton width={45} />
          )}
        </div>

        <div className="propertyInfo">
          <h3 className="propertyType">
            {data.type?.toUpperCase() || <Skeleton width={165} />}
          </h3>
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
            <div
              className="propertyReviewsButton retract"
              onClick={handleClick}
            >
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
    </Link>
  );
};

export default Property;
