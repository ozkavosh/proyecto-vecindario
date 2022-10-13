import { useState, useEffect } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import './MostSearched.css';

const MostSearched = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const request = await getDocs(
        query(collection(db, "properties"), orderBy("rating", "desc"), limit(6))
      );
      const response = request.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProperties(response);
    })();
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      navigation={false}
      spaceBetween={5}
      grabCursor={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {properties.map((property) => (
        <SwiperSlide
          key={property.id}
          onClick={() => navigate(`/inmueble/${property.id}`)}
        >
          <img src={property.images[0]} alt={property.name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MostSearched;
