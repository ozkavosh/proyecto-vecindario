import { ReactComponent as LocationIcon } from "../assets/icon/LocationFilter.svg";
import { ReactComponent as OrderIcon } from "../assets/icon/OrderFilter.svg";
import { ReactComponent as PropertyIcon } from "../assets/icon/PropertyFilter.svg";
import { ReactComponent as RatingIcon } from "../assets/icon/StarsFilter.svg";

export const types = {
  location: { text: "Región", icon: <LocationIcon /> },
  type: { text: "Inmueble", icon: <PropertyIcon /> },
  rating: {
    text: "Puntuación",
    icon: <RatingIcon/>,
  },
  orderBy: { text: "Ordenar por", icon: <OrderIcon /> },
};
