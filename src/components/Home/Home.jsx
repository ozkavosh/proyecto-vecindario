import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useChatContext } from "../../context/chatContext";
import "./Home.css";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../context/authContext";

const Home = () => {
  const { currentUser } = useAuthContext();
  const { setUnreadMessages } = useChatContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        let chats = Object.entries(doc.data());
        setUnreadMessages(chats[0][1].unreadMessages);
      });

      return () => unsub();
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  return (
    <section className="home">
      <section className="welcome container">
        <h1>¡Bienvenidos a Vecindario!</h1>
        <div className="search">
          <div className="searchbar">
            <FaSearch />
            <input type="search" placeholder="Explorar destino" />
          </div>
          <button>BUSCAR</button>
        </div>
        <p>
          Conocé los mejores sitios donde alojarte a partir de publicaciones y de reseñas de otros
          inquilinos
        </p>
      </section>
      <section className="find-your-place">
        <div className="container">
          <h2>Encontrá tu lugar ideal</h2>
          <button>Registrarme / Iniciar sesión</button>
        </div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </section>
      <section className="what-to-expect container">
        <h2>¿Qué podrás encontrar en Vecindario?</h2>
        <div>
          <article>
            <div className="img"></div>
            <img src="" alt="" />
            <p>Amplio buscador por region, inmueble, reseñas o puntuación. Hecho a tu medida.</p>
          </article>
          <article>
            <div className="img"></div>
            <img src="" alt="" />
            <p>
              Muchas reseñas para conocer a tus vecinos, el barrio, condiciones del inmueble y mucho
              más.
            </p>
          </article>
          <article>
            <div className="img"></div>
            <img src="" alt="" />
            <p>100% seguro. Perfiles verificados, dueños e inquilinos reales para tu confianza.</p>
          </article>
          <article>
            <div className="img"></div>
            <img src="" alt="" />
            <p>
              Te ayudamos con tus necesidades a través de un mapa interactivo que te brindará
              soporte.
            </p>
          </article>
        </div>
      </section>
      <section className="most-searched container">
        <h2>Los más buscados</h2>
        <Swiper
          slidesPerView={3}
          navigation={true}
          spaceBetween={30}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </section>
      <section className="join-owners">
        <div>
          <h2>¿Eres propietario?</h2>
          <button>¡Empieza ahora!</button>
          <p>
            Te ayudamos a dar a conocer tu propiedad y obtener mayor llegada a potenciales
            inquilinos.
          </p>
        </div>
      </section>
      <section className="testimonies container">
        <div className="testimony">
          <div>
            <h3>Germán Pérez</h3>
            <p>33 años</p>
          </div>
          <p>
            “Soy músico y gracias a Vecindario pude encontrar un sitio donde no moleste con mis
            ruidos.”
          </p>
        </div>
        <div className="testimony">
          <p>
            “Como propietaria intento siempre mejorar a partir de las reseñas que me dejan otros
            inquilinos.”
          </p>
          <div>
            <h3>Jennifer Paz</h3>
            <p>52 años</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
