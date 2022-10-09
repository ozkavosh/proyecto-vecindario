import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const createChatWithUser = async (currentUser, user) => {
  try {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
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
  } catch (e) {
    console.log(e);
  }
};
