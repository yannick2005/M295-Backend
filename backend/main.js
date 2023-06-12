'use strict'

// const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

let books = [
    { isbn: 1, title: "Harry Potter", year: 9812, author: "A kid" },
    { isbn: 2, title: "Anne Frank", year: 1234, author: "Anne Frank" },
    { isbn: 3, title: "Casablanca", year: 123, author: "Some guy out of Morocco" },
    { isbn: 4, title: "A massive Michi", year: "69 BC", author: "The great Michi" },
    { isbn: 5, title: "The adventures of the Michi's", year: 2005, author: "The Michi's" },
    { isbn: 6, title: "The car accident with a mobility car of a Michi", year: 2023, author: "The last survivor" },
    { isbn: 7, title: "The fall of the Michi's", year: 1289, author: "The great Michi 3"},
    { isbn: 8, title: "The rise of Michi's", year: 1100, author: "The great Michi"},
    { isbn: 9, title: "The empire of the Michi's", year: 1200, author: "The great Michi 2"},
    { isbn: 10, title: "The build of the great Wall of Michi's", year: 1269, author: "The great Michi 3"}
]

let customer = [
    {id: 1, name: "Daniel", surname: "Boulter"},
    {id: 2, name: "Yannick", surname: "Schönhaar"},
    {id: 3, name: "Michi", surname: "Michilia"},
    {id: 4, name: "Matas", surname: "Radziukynas"},
    {id: 5, name: "Just", surname: "Don't"},
    {id: 6, name: "Someone", surname: "Nobdoy"}
]

let lends = [
    { id: 1, customerId: 1, isbn: 1, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 2, customerId: 2, isbn: 2, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 3, customerId: 3, isbn: 3, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 4, customerId: 4, isbn: 4, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 5, customerId: 5, isbn: 5, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 6, customerId: 4, isbn: 6, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 7, customerId: 6, isbn: 7, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 8, customerId: 1, isbn: 8, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
    { id: 9, customerId: 2, isbn: 9, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: "Not returned yet"},
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

    books.push(newBook);
    res.status(201).json(newBook);

    // function isValid(book){
    //     return book.isbn =  
    // }
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

    // const isbn = req.params.isbn;
    // const bookIndex = books.findIndex((b) => b.isbn === isbn)
    // const bookToUpdate = request.body

    // if (bookIndex < 0){
    //     return res.sendStatus(404)
    // } else if (isValid(bookToUpdate)){
    //     return res.sendStatus(422)
    // }

});

app.delete("/books/:isbn", (req, res) => {
    // const isbn = req.params.isbn;
    // const bookIndex = books.findIndex(b => b.isbn == isbn)

    // if(bookIndex < 0){
    //     return res.sendStatus(404)
    // }
    // books.splice(bookIndex, 1)
    // res.sendStatus(204)

    const isbn = req.params.isbn;
    const bookIndex = books.findIndex((book) => book.isbn === parseInt(isbn));

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook[0]);
    } else {
        res.status(404).send("Book not found.");
    }
});

app.get("/lends", (req, res) => {
    res.json(lends)
})

app.get("/lends/:id", (req, res) => {
    const id = req.params.id;
    const lend = lends.find((lend) => lend.id === parseInt(id));

    if (lend) {
        res.json(lend);
    } else {
        res.status(404).send("Lend not found.");
    }
})

app.post('/lends', (req, res) => {
    const lendData = req.body;
    const book = books.find((b) => b.isbn === lendData.isbn);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }

    const isBookAlreadyLent = lends.some((l) => l.isbn === lendData.isbn && !l.returned_at);
    if (isBookAlreadyLent) {
        res.status(422).json({ error: 'The book is already borrowed' });
        return;
    }

    const customerLendsCount = lends.filter((l) => l.customer_id === lendData.customer_id && !l.returned_at).length;
    if (customerLendsCount >= 3) {
        res.status(422).json({ error: 'The customer already has 3 borrowed books' });
        return;
    }

    const newLend = {
        id: lends.length + 1,
        customer_id: lendData.customer_id,
        isbn: lendData.isbn,
        borrowed_at: new Date().toLocaleDateString('de-CH'),
        returned_at: null,
    };

    lends.push(newLend);
    res.status(201).json(newLend);
});

app.patch('/lends/:id', (req, res) => {
    const lendId = req.params.id;
    const lendUpdates = req.body;
    const lend = lends.find((l) => l.id === parseInt(lendId));

    if (!lend) {
        res.status(404).json({ error: 'Lend not found' });
        return;
    }

    lend.customer_id = lendUpdates.customer_id || lend.customer_id;
    lend.isbn = lendUpdates.isbn || lend.isbn;
    lend.returned_at = lendUpdates.returned_at || lend.returned_at;

    res.json(lend);
});

app.listen(port, () => {
    console.log(
        "The app is running on port: " + port, 
        `\nYou can open your browser on: http://localhost:${port}`)
})
