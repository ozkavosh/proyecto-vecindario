import "./ChatInput.css";
import { useState } from "react";
import { FaArrowAltCircleRight, FaRegSmile } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { sendChatMessage } from "../../utils/sendChatMessage";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    sendChatMessage(currentUser, data, text, setText);
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
      <button onClick={() => sendChatMessage(currentUser, data, text, setText)}>
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

export default ChatInput;
