import { useEffect, useState } from "react";
import { FaRegCommentDots, FaRegTimesCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Chat.css";

const Chat = ({ setDismount }) => {
  //TODO: replace with currentUser from authContext
  const [isLogin, setIsLogin] = useState(true);
  //TODO: unreadMessages managed through states
  let unreadMessages1 = 0;
  let unreadMessages2 = 3;

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: true }));
  }, [setDismount]);

  return (
    <section className="chat">
      {!isLogin ? (
        <div className="not-logged container">
          <FaRegCommentDots />
          <p>
            Para ver sus <strong>mensajes</strong> inicie sesión.
          </p>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="hide">Chat</h1>
          <div className="user container">
            <div className="user-info">
              <div className="profile-image">
                {unreadMessages1 > 0 ? <span className="unread">{unreadMessages1}</span> : <></>}
                <img src="" alt="img" className="profile-image" />
              </div>
              <div className="chat-info">
                <h2 className="name">Usuario</h2>
                <small className="status">En línea</small>
              </div>
            </div>
            <button className="end-slot">
              {/* TODO: change this icon */}
              <FaRegTimesCircle />
            </button>
          </div>
          <div className="searchbar container">
            <input type="search" placeholder="¿Con quién deseas hablar? ..." />
            <button>
              <FaSearch />
            </button>
          </div>
          <h2 className="container">Recientes</h2>
          <hr />
          <div className="chat-list container">
            <Link to="/chat">
              <div className="user">
                <div className="user-info">
                  <div className="profile-image">
                    {unreadMessages2 > 0 ? (
                      <span className="unread">{unreadMessages2}</span>
                    ) : (
                      <></>
                    )}
                    <img src="" alt="img" className="profile-image" />
                  </div>
                  <div className="chat-info">
                    <h2 className="name">Usuario</h2>
                    <small className="message">En línea</small>
                  </div>
                </div>
                <p className="time end-slot">14:59</p>
              </div>
            </Link>
            <Link to="/chat">
              <div className="user">
                <div className="user-info">
                  <div className="profile-image">
                    {unreadMessages2 > 0 ? (
                      <span className="unread">{unreadMessages2}</span>
                    ) : (
                      <></>
                    )}
                    <img src="" alt="img" className="profile-image" />
                  </div>
                  <div className="chat-info">
                    <h2 className="name">Usuario</h2>
                    <small className="message">En línea</small>
                  </div>
                </div>
                <p className="time end-slot">14:59</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Chat;
