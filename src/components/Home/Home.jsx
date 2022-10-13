import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as ChatIcon } from "../../assets/svg/chat_circle_dots.svg";
import { ReactComponent as KeyIcon } from "../../assets/svg/key.svg";
import { ReactComponent as MGlassIcon } from "../../assets/svg/magnifying_glass.svg";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencil_line.svg";
import MostSearched from "../MostSearched/MostSearched";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/buscador", { state: { queryFromHome: e.target.searchQuery.value?.toLowerCase() } })
  }

  return (
    <section className="home">
      <section className="welcome container">
        <h1>
          ¡Bienvenidos a <strong>Vecindario</strong>!
        </h1>
        <form className="search" onSubmit={handleSubmit}>
          <div className="searchbar">
            <FaSearch />
            <input name="searchQuery" type="text" placeholder="Explorar destino" required />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <p>
          Conocé los mejores sitios donde alojarte a partir de publicaciones y de reseñas de otros
          inquilinos
        </p>
      </section>
      <section className="find-your-place">
        <div className="container">
          <h2>Encontrá tu lugar ideal</h2>
          <p>
            Conocé los mejores sitios donde alojarte a partir de publicaciones y de reseñas de otros
            inquilinos
          </p>
        </div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/proyectovecindario.appspot.com/o/carr1.png?alt=media&token=73f3495f-fcf5-4850-9f06-c8b6f3e83739"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="what-to-expect container">
        <h2>
          ¿Qué podrás encontrar en <strong>Vecindario</strong>?
        </h2>
        <div>
          <article>
            <div className="img">
              <MGlassIcon />
            </div>
            <p>
              Amplio buscador por región, inmueble, reseñas, puntuación.{" "}
              <strong>Hecho a tu medida</strong>
            </p>
          </article>
          <article>
            <div className="img">
              <PencilIcon />
            </div>
            <p>
              Muchas <strong>reseñas</strong> para conocer a tus vecinos, el barrio, condiciones del
              inmueble y mucho más.
            </p>
          </article>
          <article>
            <div className="img">
              <KeyIcon />
            </div>
            <p>
              <strong>100% seguro</strong>. Perfiles verificados, dueños e inquilinos reales para tu
              confianza.
            </p>
          </article>
          <article>
            <div className="img">
              <ChatIcon />
            </div>
            <p>
              Conectate con los propietarios u otros inquilinos a través del
              <strong>chat</strong>.
            </p>
          </article>
        </div>
      </section>
      <section className="most-searched">
        <h2>Los más buscados</h2>
        <MostSearched/>
      </section>
      <section className="join-owners">
        <div>
          <h2>¿Eres propietario?</h2>
          <button onClick={() => navigate("/404")}>¡Empieza ahora!</button>
          <p>
            Nosotros te ayudamos a darte a conocer publicando tu propiedad y obteniendo gran llegada
            a potenciales inquilinos.
          </p>
        </div>
      </section>
      <section className="testimonies container">
        <div className="testimony">
          <div className="testimony-profile">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/proyectovecindario.appspot.com/o/testimony1.png?alt=media&token=fc221719-75a8-4296-8efd-31c00be421e6"
              alt="testimony 1"
            />
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
          <div className="testimony-profile">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/proyectovecindario.appspot.com/o/testimony2.png?alt=media&token=b06ff999-57de-4f42-8116-7c9fca0f96b2"
              alt="testimony 2"
            />
            <h3>Jennifer Paz</h3>
            <p>52 años</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
