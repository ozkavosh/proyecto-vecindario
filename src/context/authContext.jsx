import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

const AuthContext = createContext({});

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })

    return () => {
      unsub();
    }
  }, []);

  useEffect(() => {
    if(currentUser?.uid){
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), async (document) => {
        if(!document.data().favorites && !document.data().reviews){
          setCurrentUser(prev => ({...prev, favorites: [], reviews: []}))
        }else{
          setCurrentUser(prev => ({...prev, favorites: document.data().favorites, reviews: document.data().reviews}))
        }
      });
  
      return () => {
        unsub();
      }
    }
  }, [currentUser?.uid]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider };
