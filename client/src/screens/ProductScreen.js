import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

function ProductScreen() {
  const { albumName, artistName } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const decodedAlbumName = decodeURIComponent(albumName);
  const decodedArtistName = decodeURIComponent(artistName);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        console.log("Fetching album details for:", decodedAlbumName, decodedArtistName);

        const response = await fetch(
          `http://localhost:8000/api/albums/details?name=${encodeURIComponent(decodedAlbumName)}&artist=${encodeURIComponent(decodedArtistName)}`
        );

        if (!response.ok) {
          throw new Error("Album not found");
        }

        const data = await response.json();
        // console.log("Fetched album details:", data);

        setAlbum(data);
      } catch (err) {
        console.error("Error fetching album details:", err);
        setError("Failed to fetch album details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [decodedAlbumName, decodedArtistName]);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#333" }}>Loading album details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#333" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0",
      }}
    >
      <Container
        style={{
          backgroundColor: "#121212",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(29, 185, 84, 0.5)",
          maxWidth: "800px",
          padding: "30px",
          width: "100%",
        }}
      >
        <Row className="my-4">
          <Col md={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image
              src={album?.imageLink || "default-placeholder.png"}
              alt={album?.name || "Album Cover"}
              fluid
              style={{
                maxHeight: "400px",
                border: "3px solid #1db954",
                borderRadius: "10px",
              }}
            />
          </Col>
          <Col md={6} style={{ padding: "20px" }}>
            <h2 style={{ color: "#1db954", marginBottom: "20px" }}>{album?.name}</h2>
            <p>
              <strong>Artist:</strong> {album?.artist}
            </p>
            <p>
              <strong>Description:</strong> {album?.conditionDescription || "No description available."}
            </p>
            <p>
              <strong>Price:</strong> <small>$</small>{album?.price || "N/A"}
            </p>
            <p>
              <strong>Genres:</strong> {album?.genres?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Number of Songs:</strong> {album?.numOfSongs || "N/A"}
            </p>
            <p>
              <strong>Listening Time:</strong> {album?.listenTime ? `${(album.listenTime / 60).toFixed(2)} minutes` : "N/A"}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Button
                onClick={() => navigate(-1)}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                Go Back
              </Button>
              <Button
                style={{
                  backgroundColor: "#1db954",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  color: "#fff",
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductScreen;
