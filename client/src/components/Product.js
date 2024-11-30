import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../css/App.css";
import Rating  from "./Rating";


function Product() {
  return (
    <Container className="Container_product">
      <Row className="mb-4">
        <Topalbums />
      </Row>
      <div 
  style={{
    backgroundColor: "#1db954", 
    border: "2px solid #ddd", 
    padding: "10px 20px",    
    marginBottom: "20px",     
    borderRadius: "8px",       
    textAlign: "center",         
    fontSize: "18px",            
    color: "white",               
  }}
>
  <p style={{ margin: "0", fontWeight: "bold" }}>Check out our Secon Hand albums below!</p>
</div>

      <Row>
      <UsedAlbum /></Row>
    </Container>
  );
}

function Topalbums() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=6f2571d169c3b6230c53ba7452cf0b77&format=json&limit=8"
        );
        const data = await response.json();
        if (data?.albums?.album?.length) {
          setAlbums(data.albums.album);
        }
      } catch (error) {
        console.error("Error fetching the album data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (album) => {
    navigate(`/product/${album.name}+${album.artist.name}`);
  };

    return (
      <Row>
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 product"  style={{ cursor: "pointer" }}>
                
                <Card.Img
                  variant="top"
                  src={album?.image?.[2]?.["#text"]}
                  alt={album.name}
                  className="product_img"
                  onClick={() => handleProductClick(album)}
                />
                <Card.Body>
                  <div onClick={() => handleProductClick(album)}>
                  <Card.Title>{album.name}</Card.Title>
                  <Card.Text>{album.artist.name}</Card.Text>
                  <Card.Text>
                    <small>$</small>
                    <strong>9.99</strong>
                  </Card.Text>
                  </div>

                  <Rating rating={Product.rating} numReview={Product.rating}/>
                  <Button className="button"  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    );
  }

  function UsedAlbum() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/albums");
        const data = await response.json();
        
        console.log("Albums fetched from backend:", data); // Log the fetched data to verify
        if (data?.length) {
          setAlbums(data);
        }
      } catch (error) {
        console.error("Error fetching album data from MongoDB: ", error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (album) => {
    navigate(`/product/${album.name}+${album.artist}`);
  };

  return (
    <Row>
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 product" style={{ cursor: "pointer" }}>
              <Card.Img
                variant="top"
                src={album?.imageLink || "default-placeholder.png"}
                alt={album.name}
                className="product_img"
                onClick={() => handleProductClick(album)}
              />
              <Card.Body>
                <div onClick={() => handleProductClick(album)}>
                  <Card.Title>{album.name}</Card.Title>
                  <Card.Text>{album.artist}</Card.Text>
                  <Card.Text>
                    <small>$</small>
                    <strong>{album.price || "9.99"}</strong>
                  </Card.Text>
                  <Card.Text>
                    <strong>Condition: </strong>{album.condition}
                  </Card.Text>
                </div>

                <Button className="button">
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Row>
  );
}

  

export default Product;
