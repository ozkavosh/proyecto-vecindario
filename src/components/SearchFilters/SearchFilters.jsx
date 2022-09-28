import FilterButton from "../FilterButton/FilterButton";
import "./SearchFilters.css";

const SearchFilters = () => {
  return (
    <div className="search-filters-container">
      <FilterButton type="location" />
      <FilterButton type="propertyType"/>
      <FilterButton type="score"/>
      <FilterButton type="orderBy"/>
    </div>
  );
};

export default SearchFilters;
