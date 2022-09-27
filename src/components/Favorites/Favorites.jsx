import { useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import FavoriteList from "../FavoriteList/FavoriteList";
import "./Favorites.css";

const Favorites = () => {
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
        },
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
      reviews: [
        {
          id: "asdas1",
          reviewer: { displayName: "Nombre Apellido", uid: "asd454874" },
          rating: 3,
          review:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus impedit, culpa aperiam quam accusantium delectus deserunt. Ipsa iste eaque saepe possimus, numquam laboriosam blanditiis! Unde culpa doloremque quos mollitia autem.",
        },
      ],
    },
  ]);

  return (
    <section className="favorites">
      <div className="header">
        <h1>
          <FaHeart /> Tus favoritos
        </h1>
        <div className="searchbar">
          <FaSearch />
          <input type="text" />
        </div>
      </div>
      <FavoriteList data={results} />
    </section>
  );
};

export default Favorites;
