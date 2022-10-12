import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { createChatWithUser } from "../../utils/createChatWithUser";
import "./ChatUsers.css";

const ChatUsers = ({ userResults, setUserResults, setUserQuery }) => {
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();

  const handleSelect = async (user) => {
    setUserResults(null);
    setUserQuery("");

    await createChatWithUser(currentUser, user);
    dispatch({ type: "changeUser", payload: user });
    navigate("/chat/messages");
  };

  return (
    <>
      {userResults.length !== 0 ? (
        <div className="searchresults container">
          {userResults.map((result) => (
            <div
              className="userresult"
              key={result.uid}
              onClick={() => handleSelect(result)}
            >
              <div className="profile-image">
                {result.photoUrl ? (
                  <img
                    src={result.photoUrl}
                    alt="img"
                    className="profile-image"
                  />
                ) : (
                  <div className="not-found">
                    {result.displayName
                      ?.toUpperCase()
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>

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
