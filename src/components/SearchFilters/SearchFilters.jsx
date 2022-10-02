import FilterButton from "../FilterButton/FilterButton";
import "./SearchFilters.css";

const SearchFilters = ({ dispatch }) => {
  return (
    <div className="search-filters-container">
      <FilterButton type="location" dispatch={dispatch}/>
      <FilterButton type="type" dispatch={dispatch}/>
      <FilterButton type="rating" dispatch={dispatch}/>
      <FilterButton type="orderBy" dispatch={dispatch}/>
    </div>
  );
};

export default SearchFilters;
