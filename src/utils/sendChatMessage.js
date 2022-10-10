import { arrayUnion, doc, getDoc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const sendChatMessage = async (currentUser, data, text, setText) => {
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
