import React from "react";
import "../css/App.css";
import SearchBox from "../components/SearchBox";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar  expand="lg" className="header">
      <Container className="header_brand" >
        <Navbar.Brand as={Link} to="/"  >
          <h1>Albumzone</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="header_search" >
            <div className="header_search">
            <SearchBox/>
            </div>
          </Nav>
          <Nav className="header_nav">
            <Nav.Link as={Link} to="/Sign-up">
              <div className="header_option">
                <span className="header_option_line1">Hello Guest</span>
                <span className="header_option_line2">Sign In</span>
              </div>
            </Nav.Link>

            <Nav.Link as={Link} to="/orders">
              <div className="header_option">
                <span className="header_option_line1">Returns</span>
                <span className="header_option_line2">& Orders</span>
              </div>
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="header_option_cart">
              <ShoppingBasketIcon />
              <span className="header_option_line2 header_cart_count">0
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

