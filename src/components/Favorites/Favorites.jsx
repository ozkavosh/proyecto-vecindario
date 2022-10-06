import "./Favorites.css";
import { useState, useEffect } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../context/authContext";
import FavoriteList from "../FavoriteList/FavoriteList";

const Favorites = () => {
  //TODO: Fetch actual properties stored in Firebase inside useEffect
  const [results, setResults] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser?.favorites?.length) {
      (async () => {
        const request = await getDocs(
          query(
            collection(db, "properties"),
            where("__name__", "in", currentUser.favorites)
          )
        );
        const response = request.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setResults(response);
      })();
    } else {
      setResults([]);
    }
  }, [currentUser?.favorites]);

  return (
    <section className="favorites">
      <div className="header">
        <h1>
          <FaHeart /> Tus favoritos
        </h1>
        <div className="searchbar">
          <FaSearch />
          <input type="text" />
        </div>
      </div>
      <FavoriteList data={results} />
    </section>
  );
};

export default Favorites;
