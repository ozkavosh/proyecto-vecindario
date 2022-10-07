import { arrayUnion, doc, updateDoc, Timestamp, serverTimestamp, getDoc } from "firebase/firestore";
import { useState } from "react";
import { FaArrowAltCircleRight, FaRegSmile } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { db } from "../../firebase/config";
import "./ChatInput.css";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    sendMessage(e);
  };

  const sendMessage = async (e) => {
    setText("");
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          text,
          id: Math.ceil(Math.random() * 10000),
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      const response = await getDoc(doc(db, "userChats", data.user.uid));

      const unreadMessages = response.data()[data.chatId].unreadMessages || 0;

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
        [data.chatId + ".unreadMessages"]: unreadMessages + 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="messageInputContainer">
      <div>
        <input
          type="text"
          name="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FaRegSmile />
      </div>
      <button onClick={sendMessage}>
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

export default ChatInput;
