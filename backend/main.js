'use strict'

const express = require("express")
const app = express()
const port = 3000

const books = [
    {title: "Harry Potter", isbn: 12},
    {title: "Anne Frank", isbn: 38},
    {title: "Casablanca", isbn: 22},
    {title: "A massive Michi", isbn: 123}
]

app.get("books", (req, res) => {
    res.json(books)
})


app.get("books/{isbn}", (req, res) => {
    res.send(books.isbn)
})





app.listen(port, () => {
    console.log("The app is running on port: " + port)
})