// Imports
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// Assign Express Function to the app variable
const app = express();

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// Middlewares
app.use(cors());
app.use(express.json());

// Backend APIs

// Fetch All Books
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// Create New Book
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("You have successfully added a book.");
    })
})

// Delete a Book
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE book_id = ?";

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("You have successfully deleted a book.");
    })
})

// Update a Book
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE book_id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    // [req.body.title, req.body.desc, req.body.cover, req.body.price, bookId]
    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("You have successfully updated a book.");
    })
})

// Listener
app.listen(8000, () => {
    console.log("Server is running on port 8000.");
})