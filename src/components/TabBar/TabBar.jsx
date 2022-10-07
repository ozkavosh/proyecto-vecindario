import "./TabBar.css";
import { useEffect } from "react";
import { CgHome, CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import { db } from "../../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

//TODO: Replace with actual app icons

const TabBar = () => {
  const { unreadMessages, setUnreadMessages } = useChatContext();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        let um = 0;
        for (let c in data) {
          if (data[c].unreadMessages) um += data[c].unreadMessages;
        }
        setUnreadMessages(um);
      });

      return () => unsub();
    };

    currentUser?.uid ? getChats() : setUnreadMessages(0);
  }, [currentUser?.uid, setUnreadMessages]);

  //TODO: add correct icons
  return (
    <div className="tabBar">
      <ul className="tabBarTabContainer">
        <NavLink to="/" className="tab">
          <CgHome />
          <p>Home</p>
        </NavLink>

        <NavLink to="/favoritos" className="tab">
          <AiOutlineHeart />
          <p>Favoritos</p>
        </NavLink>

        <NavLink to="/buscador" className="tab">
          <FaSearch />
          <p>Reseñas</p>
        </NavLink>

        <NavLink to="/chat" className="tab">
          <div className="chat-icon-box">
            <BsChatDots />
            {unreadMessages === 0 ? (
              <></>
            ) : (
              <span className="unread-messages">{unreadMessages}</span>
            )}
          </div>
          <p>Chat</p>
        </NavLink>

        <NavLink to="/perfil" className="tab">
          <CgProfile />
          <p>Perfil</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default TabBar;
