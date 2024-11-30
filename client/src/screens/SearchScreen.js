
import { Link, useNavigate, useLocation } from "react-router-dom";
import Rating from "../components/Rating";
import {  Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import "../css/App.css";


const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  return (
    <div>
      <title>Search Products</title>
      
      <Row className="Search_Products_row">
        <Col md={3} className="Search_Products" >
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link className={"all" === category ? "text-bold" : ""}>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link className={"all" === price ? "text-bold" : ""}></Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              <li>
                <Link>
                  
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
        
          <>
            <Row className="justify-content-between mb-3">
              <Col className="text-end">
                Sort by{" "}
                <select value={order}>
                  <option value="newest">Newest Arrivals</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="toprated">Avg. Customer Reviews</option>
                </select>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    </div>
  );
}
