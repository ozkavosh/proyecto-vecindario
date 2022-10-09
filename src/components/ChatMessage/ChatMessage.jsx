import { forwardRef } from "react";
import { useAuthContext } from "../../context/authContext";
import { chatMessageFormat } from "../../utils/dateFormatters";

const ChatMessage = forwardRef(({ message }, ref) => {
  const { currentUser } = useAuthContext();

  return (
    <div
      ref={ref}
      key={message.id}
      className={
        message.senderId === currentUser.uid ? "message own" : "message"
      }
    >
      <p className="text" key={message.id}>
        {message.text}
      </p>
      <p className="date">{chatMessageFormat(message.date.toDate())}</p>
    </div>
  );
});

export default ChatMessage;
