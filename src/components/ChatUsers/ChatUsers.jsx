import "./ChatUsers.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { createChatWithUser } from "../../utils/createChatWithUser";

const ChatUsers = ({ userResults, setUserResults, setUserQuery }) => {
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();

  const handleSelect = async (user) => {
    setUserResults(null);
    setUserQuery("");

<<<<<<< HEAD
    await createChatWithUser(currentUser, user);
    dispatch({ type: "changeUser", payload: user });
    navigate("/chat/messages");
  };

  return (
    <div className="searchresults container">
      {userResults.map((result) => (
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
=======
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));
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

      dispatch({ type: "changeUser", payload: user });
      navigate("/chat/messages");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {userResults.length !== 0 ? (
        <div className="searchresults container">
          {userResults.map((result) => (
            <div className="userresult" key={result.uid} onClick={() => handleSelect(result)}>
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
>>>>>>> master

              <div className="user-name">{result.displayName}</div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatUsers;
