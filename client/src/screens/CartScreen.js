import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";

export default function CartScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <title>Shopping Cart</title>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup className="CS">
              <Row className="align-items-center ">
                <Col md={4}>
                  <img alt="" style={{ width: "100px", height: "auto" }} />{" "}
                  <Link to={`/product`}>name</Link>
                </Col>
                <Col md={3}>
                  <Button variant="light">
                    <i className="fas fa-minus-circle"></i>
                  </Button>{" "}
                  <span>quantity</span>{" "}
                  <Button variant="light">
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={3}>$price</Col>
                <Col md={2}>
                  <Button variant="light">
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup>
                  <h3>Subtotal:</h3>
                </ListGroup>
                <ListGroup>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
