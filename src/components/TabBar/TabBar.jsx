import "./TabBar.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeFullIcon } from "../../assets/icon/TabBarHomeFilled.svg";
import { ReactComponent as HomeIcon } from "../../assets/icon/TabBarHomeOutline.svg";
import { ReactComponent as FavoritesFullIcon } from "../../assets/icon/TabBarHeartOutline.svg";
import { ReactComponent as FavoritesIcon } from "../../assets/icon/TabBarHeartOutline.svg";
import { ReactComponent as SearchFullIcon } from "../../assets/icon/TabBarSearchFilled.svg";
import { ReactComponent as SearchIcon } from "../../assets/icon/TabBarSearchOutline.svg";
import { ReactComponent as ChatFullIcon } from "../../assets/icon/TabBarChatFilled.svg";
import { ReactComponent as ChatIcon } from "../../assets/icon/TabBarChatOutline.svg";
import { ReactComponent as ProfileFullIcon } from "../../assets/icon/TabBarProfileFilled.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icon/TabBarProfileOutline.svg";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import { db } from "../../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

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

  return (
    <div className="tabBar">
      <ul className="tabBarTabContainer">
        <NavLink to="/" className="tab">
          <HomeIcon />
          <HomeFullIcon />
          <p>Home</p>
        </NavLink>

        <NavLink to="/favoritos" className="tab">
          <FavoritesIcon />
          <FavoritesFullIcon />
          <p>Favoritos</p>
        </NavLink>

        <NavLink to="/buscador" className="tab">
          <SearchIcon />
          <SearchFullIcon />
          <p>Buscar</p>
        </NavLink>

        <NavLink to="/chat" className="tab">
          <div className="chat-icon-box">
            <ChatIcon />
            <ChatFullIcon />
            {unreadMessages === 0 ? (
              <></>
            ) : (
              <span className="unread-messages">{unreadMessages}</span>
            )}
          </div>
          <p>Chat</p>
        </NavLink>

        <NavLink to="/perfil" className="tab">
          <ProfileIcon />
          <ProfileFullIcon />
          <p>Perfil</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default TabBar;
