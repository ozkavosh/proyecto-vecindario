import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegStar, FaStar, FaList } from "react-icons/fa";

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
