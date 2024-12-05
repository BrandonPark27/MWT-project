const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require('cors');
require('dotenv').config();

 
// adding our mongoDB database
const mongoose = require("mongoose"); // importing the dependancy
mongoose.connect(process.env.MongoDBKey); // establishing a connection -> connect command + an api string to connect to our database
// this does not keep the connection, only establishes where it will go to connect
const db = mongoose.connection; // saving the databse usecase into a variable
 
 
db.once("open", () => {
  // Check connection
  console.log("Connected to MongoDB");
});
 
 
db.on("error", (err) => {
  // Check for DB errors
  console.log("DB Error");
});
 
 
// middlelware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
 
// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});
 
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
 


const UsedAlbum = require('./models/usedAlbum'); 

app.get('/api/albums', async (req, res) => {
  try {
    const query = req.query.query || '';
    const albums = query
      ? await UsedAlbum.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { artist: { $regex: query, $options: 'i' } },
          ],
        })
      : await UsedAlbum.find();

    res.json(albums);
  } catch (err) {
    console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Error fetching albums" });
  }
});

app.get("/api/albums/details", async (req, res) => {
  const { name, artist } = req.query;

  console.log("Received name:", name);
  console.log("Received artist:", artist);

  try {
    const album = await UsedAlbum.findOne({
      name: { $regex: new RegExp(name, "i") }, 
      artist: { $regex: new RegExp(artist, "i") },
    });

    console.log("Fetched album:", album);

    if (album) {
      res.json(album); 
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({ message: "Error fetching album", error: error.message });
  }
});


 app.use("", (req, res) => {
  res.status(404).send("Page not found");
});