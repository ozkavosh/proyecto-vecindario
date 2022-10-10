import { useState } from "react";
import { FaArrowAltCircleRight, FaRegSmile } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
import { sendChatMessage } from "../../utils/sendChatMessage";
import "./ChatInput.css";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendChatMessage(currentUser, data, text.trim(), setText)
  }

  return (
    <form className="messageInputContainer" onSubmit={handleSendMessage}>
      <div>
        <input
          type="text"
          name="message"
          pattern=".+"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <FaRegSmile />
      </div>
      <button type="submit">
        <FaArrowAltCircleRight />
      </button>
    </form>
  );
};

export default ChatInput;
