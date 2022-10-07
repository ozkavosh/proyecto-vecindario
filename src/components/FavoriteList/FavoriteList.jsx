import Property from "../Property/Property";
import "./FavoriteList.css";

const FavoriteList = ({ data }) => {
  console.log(data);
  return (
    <div className="favorite-list">
      {data.length !== 0 ? (
        data.map((property) => <Property key={property.id} data={property} />)
      ) : (
        <h3 className="empty-favs">Aún no has agregado ninguna propiedad a tus favoritos.</h3>
      )}
    </div>
  );
};

export default FavoriteList;
