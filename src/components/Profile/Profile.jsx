import { useEffect } from "react";
import { FaEraser, FaRegCommentAlt, FaRegEdit } from "react-icons/fa";
import "./Profile.css";

const Profile = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: true, tabBar: true }));
  }, [setDismount]);
  return (
    <section className="profile">
      <h1>
        <img src="" alt="img" /> Bienvenido/a Usuario
      </h1>
      <hr />
      <section className="user-info">
        <h2>Mis Datos</h2>
        <div className="input">
          <input className="editable" type="text" value="Pedro Gonzalez" disabled readOnly />
          <FaRegEdit className="icon" />
        </div>
        <div className="input">
          <input type="email" value="ejemplo@gmail.com" disabled readOnly />
        </div>
        <div className="input">
          <input type="password" value="abc12345678" disabled readOnly />
        </div>
      </section>
      <section className="user-reviews">
        <h2>Mis Reseñas</h2>
        <div className="reviews-container">
          <article className="review">
            <h3>
              <FaRegCommentAlt /> Reseña de sitio
            </h3>
            <div className="preview">
              <p>
                Ipsum dolor dolore tempor exercitation do non quis tempor excepteur ex culpa minim
                est do. Laboris nostrud ea occaecat enim aliqua nulla sunt ut. Aliqua id eu quis
                cupidatat non. Reprehenderit pariatur dolore reprehenderit aliqua adipisicing
                deserunt cillum. Labore mollit aute tempor duis ut est aliquip reprehenderit. Amet
                veniam et ex duis ea ea sint Lorem labore eu do dolor. Amet consectetur quis ex
                occaecat sint.
              </p>
              <button className="action">
                <FaEraser />
              </button>
            </div>
          </article>
          <article className="review">
            <h3>
              <FaRegCommentAlt /> Reseña de sitio
            </h3>
            <div className="preview">
              <p>
                Aute mollit mollit nostrud tempor esse ea consequat consectetur do non. Sunt
                exercitation sint ullamco voluptate veniam.
              </p>
              <button className="action">
                <FaEraser />
              </button>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
};

export default Profile;
