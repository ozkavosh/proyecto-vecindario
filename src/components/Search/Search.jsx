import { Container, Row, Col } from "react-bootstrap";
import { entity as entityCategories } from "../../utils/categories";
import './Search.css';

const Search = () => {
  return (
    <Container className="py-5 searchContainer">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
            <h2>Buscar reseñas</h2>
        </Col>
        <Col xs={"auto"} as="form" className="d-flex">
          <select name="searchType" defaultValue={"default"} className="form-select">
            <option value="default" disabled>Tipo de búsqueda</option>
            {entityCategories.map((categoryName, id) => (
              <option key={id} value={id}>{categoryName}</option>
            ))}
          </select>
          <input type="text" name="search" className="form-control" placeholder="Ingrese un nombre..." />
          <input type="submit" value="Buscar" className="btn btn-dark mx-2"/>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
