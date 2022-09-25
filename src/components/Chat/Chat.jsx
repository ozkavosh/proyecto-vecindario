import ChatMessages from "../ChatMessages/ChatMessages";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRegCommentDots, FaRegTimesCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import "./Chat.css";

const Chat = ({ setDismount }) => {
  const { currentUser } = useAuthContext();
  const { dispatch, data, connectedUsers } = useChatContext();
  const [userResults, setUserResults] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [chats, setChats] = useState([]);
  //TODO: unreadMessages managed through states
  let unreadMessages1 = 0;
  let unreadMessages2 = 3;

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

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => unsub();
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = async (user) => {
    setUserResults(null);
    setUserQuery("");

    dispatch({ type: "changeUser", payload: user });

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "users", combinedId));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

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
                {unreadMessages1 > 0 ? (
                  <span className="unread">{unreadMessages1}</span>
                ) : (
                  <></>
                )}
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

          {/*Added on chat-test branch, for testing purposes only, must discuss with team for results styles*/}
          <div className="searchresults container">
            {userResults &&
              userResults.map((result) => (
                <div
                  className="userresult"
                  key={result.uid}
                  onClick={() => handleSelect(result)}
                >
                  <div className="profile-image">
                    <div className="not-found">
                      {result.displayName
                        ?.toUpperCase()
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  </div>

                  <div className="user-name">{result.displayName}</div>
                </div>
              ))}
          </div>

          <h2 className="container">Recientes</h2>
          <hr />
          <div className="chat-list container">
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                <Link to="/chat">
                  <div
                    className="user"
                    key={chat[0]}
                    onClick={() =>
                      dispatch({
                        type: "changeUser",
                        payload: chat[1].userInfo,
                      })
                    }
                  >
                    <div className="user-info">
                      <div className="profile-image">
                        {chat[1].unreadMessages > 0 ? (
                          <span className="unread">{chat[1].unreadMessages}</span>
                        ) : (
                          <></>
                        )}
                        {chat[1].userInfo.photoURL ? (
                          <img
                            src={chat[1].userInfo.photoURL}
                            alt="img"
                            className="profile-image"
                          />
                        ) : (
                          <div className="not-found">
                            {chat[1].userInfo.displayName
                              ?.toUpperCase()
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                        )}
                      </div>

                      <div className="chat-info">
                        <h2 className="name">{chat[1].userInfo.displayName}</h2>
                        <small className="message">
                          {connectedUsers.includes(chat[1].userInfo.uid)
                            ? "En linea"
                            : "Desconectad@"}{" "}
                          | {chat[1].lastMessage?.text}
                        </small>
                      </div>
                    </div>
                    <p className="time end-slot">14:59</p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Chat;
