'use strict'

const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const port = 3000

app.use(bodyParser.json())

const books = [
    { isbn: 1, title: "Harry Potter", year: 9812, author: "A kid" },
    { isbn: 2, title: "Anne Frank", year: 1234, author: "Anne Frank" },
    { isbn: 3, title: "Casablanca", year: 123, author: "Some guy out of Morocco" },
    { isbn: 4, title: "A massive Michi", year: "69 BC", author: "The great Michi" },
    { isbn: 5, title: "The adventures of the Michi's", year: 2005, author: "The Michi's" },
    { isbn: 6, title: "The car accident with a mobility car of a Michi", year: 2023, author: "The last survivor" }
]

app.get("/books", (req, res) => {
    res.json(books)
})

app.get("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find((book) => book.isbn === parseInt(isbn));

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found.");
    }
});

app.post("/books", (req, res) => {
    const newBook = req.body;
    console.log(newBook)

    if (newBook){
        books.push(newBook);
        res.status(201).json(newBook);
    } else {
        res.send("Something went wrong")
    }
});

app.put("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex((book) => book.isbn === parseInt(isbn));

    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...req.body };
        res.json(books[bookIndex]);
    } else {
        res.status(404).send("Book not found.");
    }
});

app.delete("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex((book) => book.isbn === parseInt(isbn));

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook[0]);
    } else {
        res.status(404).send("Book not found.");
    }
});

app.listen(port, () => {
    console.log("The app is running on port: " + port)
})