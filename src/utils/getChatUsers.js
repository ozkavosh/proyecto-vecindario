import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const getChatUsers = async (userQuery, currentUser, setUserResults) => {
    try {
        const response = await getDocs(collection(db, "users"));
        //Resource expensive way, for both Firebase daily quote and user's bandwith. Not a big problem for demo but should consider a different approach.
        const results = response.docs
          .map((d) => d.data())
          .filter(
            (d) =>
              d.displayName.toLowerCase().includes(userQuery.toLowerCase()) &&
              d.uid !== currentUser.uid
          );
        setUserResults(results);
      } catch (e) {
        console.log(e);
        setUserResults([]);
      }
}