import { BiBuildingHouse } from "react-icons/bi";
import { FaList, FaRegStar, FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

export const types = {
  location: { text: "Región", icon: <HiOutlineLocationMarker /> },
  type: { text: "Inmueble", icon: <BiBuildingHouse /> },
  rating: {
    text: "Puntuación",
    icon: (
      <>
        <FaStar />
        <FaRegStar />
      </>
    ),
  },
  orderBy: { text: "Ordenar por", icon: <FaList /> },
};
