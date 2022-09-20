import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const createUserDocs = async (user, displayName, email) => {
  const response = await getDoc(doc(db, "users", user.uid));
  if (!response.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: displayName || user.displayName,
      email: email || user.email,
    });

    await setDoc(doc(db, "userChats", user.uid), {});
  }
};

export default createUserDocs;
