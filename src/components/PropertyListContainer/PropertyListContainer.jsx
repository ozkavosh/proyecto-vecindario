import React from "react";
import Property from "../Property/Property";
import "./PropertyListContainer.css";

const PropertyListContainer = ({ data }) => {
  return (
    <div className="propertyListContainer">
      {data.map((property, id) => (
        <Property key={id} data={property} />
      ))}
    </div>
  );
};

export default PropertyListContainer;
