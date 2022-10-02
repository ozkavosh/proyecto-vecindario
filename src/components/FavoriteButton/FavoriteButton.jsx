import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";

const FavoriteButton = ({ pid }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleFavorite = async (type) => {
    if (!currentUser?.uid) return navigate("/favoritos");

    switch (type) {
      case "add":
        await updateDoc(doc(db, "users", currentUser.uid), {
          favorites: arrayUnion(pid),
        });
        break;
      case "remove":
        await updateDoc(doc(db, "users", currentUser.uid), {
          favorites: arrayRemove(pid),
        });
        break;
      default:
        return;
    }
  };

  return currentUser?.favorites?.includes(pid) ? (
    <FaHeart onClick={() => handleFavorite("remove")} />
  ) : (
    <FaRegHeart onClick={() => handleFavorite("add")} />
  );
};

export default FavoriteButton;
