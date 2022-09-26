import ChatMessages from "../ChatMessages/ChatMessages";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegCommentDots, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import "./Chat.css";
import ChatList from "../ChatList/ChatList";
import ChatUsers from "../ChatUsers/ChatUsers";

const Chat = ({ setDismount }) => {
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();
  const [userResults, setUserResults] = useState(null);
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () =>
      setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  useEffect(() => {
    if (userQuery.length >= 4) {
      (async () => {
        try {
          const response = await getDocs(collection(db, "users"));
          //Resource expensive way, for both Firebase daily quote and user's bandwith. Not a big problem for demo but should consider a different approach.
          const results = response.docs
            .map((d) => d.data())
            .filter(
              (d) =>
                d.displayName.toLowerCase().includes(userQuery.toLowerCase()) &&
                d.uid !== currentUser.uid
            );
          setUserResults(results);
        } catch (e) {
          console.log(e);
          setUserResults([]);
        }
      })();
    } else {
      setUserResults([]);
    }
  }, [userQuery, currentUser?.uid]);

  return (
    <section className="chat">
      {!currentUser ? (
        <div className="not-logged container">
          <FaRegCommentDots />
          <p>
            Para ver sus <strong>mensajes</strong> inicie sesión.
          </p>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      ) : data.user ? (
        <ChatMessages />
      ) : (
        <>
          <h1 className="hide">Chat</h1>
          <div className="user container">
            <div className="user-info">
              <div className="profile-image">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="img"
                    className="profile-image"
                  />
                ) : (
                  <div className="not-found">
                    {currentUser?.displayName
                      ?.toUpperCase()
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
              <div className="chat-info">
                <h2 className="name">{currentUser.displayName}</h2>
              </div>
            </div>
          </div>
          <div className="searchbar container">
            <input
              type="search"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="¿Con quién deseas hablar? ..."
            />
            <button>
              <FaSearch />
            </button>
          </div>

          {userResults && (
            <ChatUsers
              userResults={userResults}
              setUserResults={setUserResults}
              setUserQuery={setUserQuery}
            />
          )}

          <ChatList />
        </>
      )}
    </section>
  );
};

export default Chat;
