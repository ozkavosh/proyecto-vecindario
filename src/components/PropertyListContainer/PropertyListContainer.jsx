import React from 'react'
import Property from "../Property/Property";
import './PropertyListContainer.css';

const PropertyListContainer = ({ data }) => {
  return (
    <div className="propertyListContainer">
        { data.map(property => <Property key={property.id} data={property}/>) }
    </div>
  )
}

export default PropertyListContainer