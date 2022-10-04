import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { useAuthContext } from '../../context/authContext';
import { db } from '../../firebase/config';

const RemoveReviewButton = ({ pid, rid }) => {
    const { currentUser } = useAuthContext();

    const handleRemoveReview = async () => {
        try{
            await deleteDoc(doc(db, "reviews", rid));
            await updateDoc(doc(db, "users", currentUser.uid), { reviews: arrayRemove(rid) });
            await updateDoc(doc(db, "properties", pid), { reviews: arrayRemove(rid) })
        }catch(e){
            console.log(e);
        }
    }

  return (
    <FaTrash onClick={handleRemoveReview}/>
  )
}

export default RemoveReviewButton