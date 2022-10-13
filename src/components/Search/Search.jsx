import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import search from "../../reducers/search";
import AppliedFilters from "../AppliedFilters/AppliedFilters";
import PropertyListContainer from "../PropertyListContainer/PropertyListContainer";
import SearchFilters from "../SearchFilters/SearchFilters";
import "./Search.css";

const Search = ({ setDismount }) => {
  const [results, setResults] = useState([{}, {}]);
  const [searchQuery, dispatch] = useReducer(search.reducer, search.initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, header: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, header: false }));
  }, [setDismount]);

  const handleChange = debounce((e) => {
    dispatch({ type: "setInput", payload: e?.target?.value?.toLowerCase() });
  }, 1000);

  const searchDefault = useCallback(async () => {
    try {
      const request = await getDocs(
        searchQuery.orderBy
          ? query(
            collection(db, "properties"),
            orderBy(searchQuery.orderBy.field, searchQuery.orderBy.type),
            limit(5)
          )
          : query(collection(db, "properties"), limit(5))
      );
      const responseArray = request.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      }));
      setResults(responseArray);
    } catch (e) {
      console.error(e);
    }
  }, [searchQuery.orderBy]);

  const searchWithQuery = useCallback(async () => {
    try {
      let q;

      if (searchQuery.filter && searchQuery.orderBy) {
        if (searchQuery.filter.field === "rating" && searchQuery.orderBy?.field === "rating") {
          q = query(
            collection(db, "properties"),
            where(searchQuery.filter.field, "==", searchQuery.filter.equalTo)
          );
        } else {
          q = query(
            collection(db, "properties"),
            orderBy(searchQuery.orderBy.field, searchQuery.orderBy.type),
            where(searchQuery.filter.field, "==", searchQuery.filter.equalTo)
          );
        }
      } else if (searchQuery.filter) {
        q = query(
          collection(db, "properties"),
          where(searchQuery.filter.field, "==", searchQuery.filter.equalTo)
        );
      } else if (searchQuery.orderBy) {
        q = query(
          collection(db, "properties"),
          orderBy(searchQuery.orderBy.field, searchQuery.orderBy.type)
        );
      } else {
        q = query(collection(db, "properties"));
      }

      const request = await getDocs(q);
      const responseArray = request.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      }));
      setResults(
        responseArray.filter(
          (property) =>
            property.name.toLowerCase().includes(searchQuery.input) ||
            property.type.toLowerCase().includes(searchQuery.input) ||
            property.location.toLowerCase().includes(searchQuery.input)
        )
      );
    } catch (e) {
      console.error(e);
    }
  }, [searchQuery.input, searchQuery.orderBy, searchQuery.filter]);

  useEffect(() => {
    if(location?.state?.queryFromHome){
      searchInputRef.current.value = location.state.queryFromHome;
      dispatch({ type: "setInput", payload: location.state.queryFromHome});
      delete location.state.queryFromHome;
    }
  }, [location?.state])

  useEffect(() => {
    if (searchQuery.input || searchQuery.filter) {
      searchWithQuery();
    } else {
      searchDefault();
    }
  }, [searchQuery.input, searchQuery.filter, searchWithQuery, searchDefault]);

  return (
    <section className="search">
      <div className="container">
        <div className="searchHeader">
          <div className="searchBar">
            <FaSearch className="searchInputIcon" />
            <input
              type="text"
              placeholder="Buscá tu lugar ideal"
              name="search"
              className="searchInput"
              ref={searchInputRef}
              onChange={handleChange}
            />
          </div>
          <FaRegBell className="searchNotification" onClick={() => navigate("/perfil/notificaciones")} />
        </div>

        <SearchFilters dispatch={dispatch} />

        {searchQuery.filter && (
          <AppliedFilters appliedFilter={searchQuery.filter} dispatch={dispatch} />
        )}

        <PropertyListContainer data={results} />
      </div>
    </section>
  );
};

export default Search;
