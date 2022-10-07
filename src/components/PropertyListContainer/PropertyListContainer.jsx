import "./PropertyListContainer.css";
import React from "react";
import Property from "../Property/Property";

const PropertyListContainer = ({ data }) => {
  return (
    <div className="propertyListContainer">
      {data.map((property, id) => (
        <Property key={property.id || id} data={property} />
      ))}
    </div>
  );
};

export default PropertyListContainer;
