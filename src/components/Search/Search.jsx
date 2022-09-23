import "./Search.css";
import { useState } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import PropertyListContainer from "../PropertyListContainer/PropertyListContainer";

const Search = () => {
  //TODO: Fetch actual properties stored in Firebase inside useEffect
  const [results, setResults] = useState([
    {
      owner: { displayName: "Nombre Apellido", uid: "asd454871" },
      id: "asd45451",
      rating: 4,
      images: [],
      type: "habitacion",
      location: "Ciudad, provincia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nam doloribus architecto eum recusandae quasi quibusdam sunt necessitatibus. Eos illo eaque maxime deserunt harum temporibus perspiciatis perferendis ex sapiente veniam! Alias vero voluptas natus odio. Quae natus, tenetur, eius eligendi rerum quia quidem accusamus esse totam vero labore eaque asperiores ut deleniti accusantium provident quasi aspernatur sequi? Optio, delectus nostrum.",
      reviews: [
        {
          id: "asdas1",
          reviewer: { displayName: "Nombre Apellido", uid: "asd454873" },
          rating: 3,
          review:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus impedit, culpa aperiam quam accusantium delectus deserunt. Ipsa iste eaque saepe possimus, numquam laboriosam blanditiis! Unde culpa doloremque quos mollitia autem.",
        },
        {
          id: "asdas2",
          reviewer: { displayName: "Nombre Apellido", uid: "asd454874" },
          rating: 5,
          review:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus impedit, culpa aperiam quam accusantium delectus deserunt. Ipsa iste eaque saepe possimus, numquam laboriosam blanditiis! Unde culpa doloremque quos mollitia autem.",
        }
      ],
    },
    {
      owner: { displayName: "Nombre Apellido 2", uid: "asd454872" },
      id: "asd45452",
      rating: 3,
      images: [],
      type: "edificio",
      location: "Ciudad, provincia 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nam doloribus architecto eum recusandae quasi quibusdam sunt necessitatibus. Eos illo eaque maxime deserunt harum temporibus perspiciatis perferendis ex sapiente veniam! Alias vero voluptas natus odio. Quae natus, tenetur, eius eligendi rerum quia quidem accusamus esse totam vero labore eaque asperiores ut deleniti accusantium provident quasi aspernatur sequi? Optio, delectus nostrum.",
      reviews: [{
        id: "asdas1",
        reviewer: { displayName: "Nombre Apellido", uid: "asd454874" },
        rating: 3,
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus impedit, culpa aperiam quam accusantium delectus deserunt. Ipsa iste eaque saepe possimus, numquam laboriosam blanditiis! Unde culpa doloremque quos mollitia autem.",
      }],
    },
  ]);

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

        <div className="searchOptions">
          <select name="filters" className="searchFilters" defaultValue="0">
            <option value="0" disabled>
              Filtrar por
            </option>
          </select>
          <select name="order" className="searchOrder" defaultValue="0">
            <option value="0" disabled>
              Ordenar por
            </option>
          </select>
        </div>

        <PropertyListContainer data={results} />
      </div>
    </section>
  );
};

export default Search;
