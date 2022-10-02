import "./Search.css";
import { useEffect, useState, useReducer, useCallback } from "react";
import { debounce } from "lodash";
import { FaRegBell, FaSearch } from "react-icons/fa";
import {
  getDocs,
  collection,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import PropertyListContainer from "../PropertyListContainer/PropertyListContainer";
import SearchFilters from "../SearchFilters/SearchFilters";
import AppliedFilters from "../AppliedFilters/AppliedFilters";

const Search = () => {
  //TODO: Fetch actual properties stored in Firebase inside useEffect
  const [results, setResults] = useState([]);
  const [searchQuery, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setFilter":
          return { ...state, filter: action.payload };
        case "setOrder":
          return { ...state, orderBy: action.payload };
        case "setInput":
          return { ...state, input: action.payload };
        default:
          return state;
      }
    },
    { filter: null, orderBy: null, input: "" }
  );

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
    console.log(searchQuery.orderBy, searchQuery.filter);
    try {
      let q;

      if(searchQuery.filter && searchQuery.orderBy){
        if(searchQuery.filter.field === "rating" && searchQuery.orderBy?.field === "rating"){
          q = query(
            collection(db, "properties"),
            where(
              searchQuery.filter.field,
              "==",
              searchQuery.filter.equalTo
            )
          )
        }else{
          q = query(
            collection(db, "properties"),
            orderBy(searchQuery.orderBy.field, searchQuery.orderBy.type),
            where(
              searchQuery.filter.field,
              "==",
              searchQuery.filter.equalTo
            )
          )
        }
      }else if(searchQuery.filter){
          q = query(
            collection(db, "properties"),
            where(
              searchQuery.filter.field,
              "==",
              searchQuery.filter.equalTo
            )
          )
      }else if(searchQuery.orderBy){
        q = query(
          collection(db, "properties"),
          orderBy(searchQuery.orderBy.field, searchQuery.orderBy.type)
        )
      }else{
        q = query(
          collection(db, "properties")
        )
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
              onChange={handleChange}
              name="search"
              className="searchInput"
            />
          </div>
          <FaRegBell className="searchNotification" />
        </div>

        <SearchFilters dispatch={dispatch} />

        { searchQuery.filter && <AppliedFilters appliedFilter={searchQuery.filter} dispatch={dispatch} />}

        <PropertyListContainer data={results} />
      </div>
    </section>
  );
};

export default Search;
