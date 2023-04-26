const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.post("/books", async (req, res) => {
  const { title, category, author, description } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO books (image,title, category, author, description, price, numA) VALUES ($1, $2, $3, $4)",
      [title, category, author, description]
    );
    res.status(201).send("Book added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book to database");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
