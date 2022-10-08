import "./Favorites.css";
import { useState, useEffect, useReducer, useCallback } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../context/authContext";
import FavoriteList from "../FavoriteList/FavoriteList";
import FavoritesOrderButton from "../FavoritesOrderButton/FavoritesOrderButton";

const Favorites = () => {
  //TODO: Fetch actual properties stored in Firebase inside useEffect
  const [results, setResults] = useState([]);
  const { currentUser } = useAuthContext();
  const [searchQuery, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setInput":
          return { ...state, input: action.payload };
        case "setOrderBy":
          return { ...state, orderBy: action.payload };
        default:
          return state;
      }
    },
    { input: "", orderBy: null }
  );

  const searchFavorites = useCallback(async () => {
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
  }, [currentUser.favorites]);

  const searchFavoritesByQuery = useCallback(async () => {
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

    if (searchQuery.orderBy) {
      const ordered =
        searchQuery.orderBy === "rating"
          ? response.sort((a, b) => b.rating - a.rating)
          : searchQuery.orderBy === "older"
          ? response.sort((a, b) => b.createdAt - a.createdAt)
          : response.sort((a, b) => a.createdAt - b.createdAt);

      setResults(
        ordered.filter(
          (favorite) =>
            favorite.name.toLowerCase().includes(searchQuery.input) ||
            favorite.type.toLowerCase().includes(searchQuery.input) ||
            favorite.location.toLowerCase().includes(searchQuery.input)
        )
      );
    } else {
      setResults(
        response.filter(
          (favorite) =>
            favorite.name.toLowerCase().includes(searchQuery.input) ||
            favorite.type.toLowerCase().includes(searchQuery.input) ||
            favorite.location.toLowerCase().includes(searchQuery.input)
        )
      );
    }
  }, [currentUser.favorites, searchQuery.input, searchQuery.orderBy]);

  const handleChange = debounce((e) => {
    dispatch({ type: "setInput", payload: e?.target?.value?.toLowerCase() });
  }, 1000);

  useEffect(() => {
    if (currentUser?.favorites?.length) {
      if (searchQuery.input || searchQuery.orderBy) {
        searchFavoritesByQuery();
      } else {
        searchFavorites();
      }
    } else {
      setResults([]);
    }
  }, [
    currentUser?.favorites,
    searchQuery.input,
    searchQuery.orderBy,
    searchFavoritesByQuery,
    searchFavorites,
  ]);

  return (
    <section className="favorites">
      <div className="header">
        <h1>
          <FaHeart /> Tus favoritos
        </h1>
        <div>
          <div className="searchbar">
            <FaSearch />
            <input type="text" onChange={handleChange} />
          </div>
          <FavoritesOrderButton dispatch={dispatch} />
        </div>
      </div>
      <FavoriteList data={results} />
    </section>
  );
};

export default Favorites;
