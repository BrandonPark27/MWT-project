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
 
 


const UsedAlbum = require('./models/usedAlbum'); // Adjust the path if necessary

app.get("/api/albums", async (req, res) => {
  try {
    const Albums = await UsedAlbum.find();
    console.log("Fetched albums:", Albums);
    res.json(Albums); 
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ message: "Error fetching albums", error: error.message });
  }
});

 app.use("", (req, res) => {
  res.status(404).send("Page not found");
});