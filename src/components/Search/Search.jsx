import "./Search.css";
import { useEffect, useState } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { getDocs, collection, query, limit } from "firebase/firestore";
import { db } from "../../firebase/config";
import PropertyListContainer from "../PropertyListContainer/PropertyListContainer";
import SearchFilters from "../SearchFilters/SearchFilters";

const Search = () => {
  //TODO: Fetch actual properties stored in Firebase inside useEffect
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const request = await getDocs(
          query(collection(db, "properties"), limit(5))
        );
        setResults(request.docs.map((d) => ({...d.data(), id: d.id})));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <section className="search">
      <div className="container">
        <div className="searchHeader">
          <div className="searchBar">
            <FaSearch className="searchInputIcon" />
            <input type="text" name="search" className="searchInput" />
          </div>
          <FaRegBell className="searchNotification" />
        </div>

        <SearchFilters />

        <PropertyListContainer data={results} />
      </div>
    </section>
  );
};

export default Search;
