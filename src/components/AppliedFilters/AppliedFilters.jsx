import React from "react";
import Stars from "../Stars/Stars";
import "./AppliedFilters.css";

const AppliedFilters = ({ appliedFilter, dispatch }) => {
  const formatFilter = (filter) => {
    filter = filter[0].toUpperCase() + filter.slice(1);
    return filter === "Hotel" ? filter + "es" : filter + "s";
  };

  const handleClick = () => {
    dispatch({ type: 'setFilter', payload: null });
  }

  return (
    <div className="applied-filters-container">
      <div className="applied-filter" onClick={handleClick}>
        {appliedFilter.field === "rating" ? (
          <Stars ammount={appliedFilter.equalTo} />
        ) : (
          <p>{formatFilter(appliedFilter.equalTo)}</p>
        )}
        <span>x</span>
      </div>
    </div>
  );
};

export default AppliedFilters;
