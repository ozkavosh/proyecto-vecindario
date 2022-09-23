import FilterButton from "../FilterButton/FilterButton";
import "./SearchFilters.css";

const SearchFilters = () => {
  const handleClick = () => {
    console.log("hola");
  };

  return (
    <div className="searchOptions">
      <FilterButton text="Filtrar por" onClick={handleClick} />
      <FilterButton text="Ordenar por" onClick={handleClick} />
    </div>
  );
};

export default SearchFilters;
