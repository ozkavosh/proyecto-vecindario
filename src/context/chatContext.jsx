import { createContext, useContext, useEffect, useReducer, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./authContext";

const ChatContext = createContext({});

const useChatContext = () => {
  return useContext(ChatContext);
};

//Socket instance should be unique
let socket;

const ChatContextProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [state, dispatch] = useReducer(
    (state, action) => {
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
    },
    { chatId: null, user: null }
  );

  useEffect(() => {
    //Create socket instance if it doesn't exist
    if (currentUser?.uid && !socket) {
      socket = io("https://proyecto-vecindario-backend-production.up.railway.app", {
        query: { uid: currentUser.uid },
      });

      //Get connectedUsers array on each connection
      socket.on("connectedUsers", (list) => {
        setConnectedUsers(list);
      });

      return () => {
        socket.off("connectedUsers");
      };
    } else {
      //If there is no current user disconnect socket
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    }
  }, [currentUser?.uid]);

  return (
    <ChatContext.Provider
      value={{
        data: state,
        connectedUsers,
        unreadMessages,
        dispatch,
        setUnreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { useChatContext, ChatContextProvider };
