import { createContext, useContext, useReducer, useState, useEffect } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

const ChatContext = createContext({});

const useChatContext = () => {
  return useContext(ChatContext);
};

let socket;

const ChatContextProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { currentUser } = useAuthContext();
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    if (currentUser?.uid) {
      socket = io("https://proyecto-vecindario-backend-production.up.railway.app", {
        query: { uid: currentUser.uid },
      });

      socket.on("connectedUsers", (list) => {
        setConnectedUsers(list);
      });

      return () => {
        socket.off("connectedUsers");
      };
    } else {
      if (socket) {
        socket.disconnect();
      }
    }
  }, [currentUser?.uid]);

  const initialState = { chatId: null, user: null };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "changeUser":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "removeUser":
        return { chatId: null, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider
      value={{ data: state, connectedUsers, dispatch, unreadMessages, setUnreadMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { useChatContext, ChatContextProvider };
