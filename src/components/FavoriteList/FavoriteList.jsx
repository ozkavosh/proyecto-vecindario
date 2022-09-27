import Property from "../Property/Property";
import "./FavoriteList.css";

const FavoriteList = ({ data }) => {
  return (
    <div className="favorite-list">
      {data.map((property) => (
        <Property key={property.id} data={property} />
      ))}
    </div>
  );
};

export default FavoriteList;
