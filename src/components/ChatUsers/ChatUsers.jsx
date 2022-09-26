import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import "./ChatUsers.css";

const ChatUsers = ({ userResults, setUserResults, setUserQuery }) => {
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();

  const handleSelect = async (user) => {
    setUserResults(null);
    setUserQuery("");

    dispatch({ type: "changeUser", payload: user });

    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
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

          <div className="user-name">{result.displayName}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatUsers;
