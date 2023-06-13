'use strict'

// const bodyParser = require("body-parser")
const express = require("express")
const session = require("express-session")
const app = express()
const port = 3000

app.use(express.json())

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

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

// let customer = [
//     {id: 1, name: "Daniel", surname: "Boulter"},
//     {id: 2, name: "Yannick", surname: "Schönhaar"},
//     {id: 3, name: "Michi", surname: "Michilia"},
//     {id: 4, name: "Matas", surname: "Radziukynas"},
//     {id: 5, name: "Just", surname: "Don't"},
//     {id: 6, name: "Someone", surname: "Nobdoy"}
// ]

let lends = [
    { id: 1, customerId: 1, isbn: 1, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 2, customerId: 2, isbn: 2, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 3, customerId: 3, isbn: 3, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 4, customerId: 4, isbn: 4, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 5, customerId: 5, isbn: 5, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 6, customerId: 4, isbn: 6, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 7, customerId: 6, isbn: 7, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 8, customerId: 1, isbn: 8, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
    { id: 9, customerId: 2, isbn: 9, borrowedAt: new Date().toLocaleDateString('de-CH'), returnedAt: null},
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

app.get("/lends", isAuthenticated, (req, res) => {
    res.json(lends)
})

app.get("/lends/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;
    const lend = lends.find((lend) => lend.id === parseInt(id));

    if (lend) {
        res.json(lend);
    } else {
        res.status(404).send("Lend not found.");
    }
})

app.post('/lends', isAuthenticated, (req, res) => {
    const newLend = req.body;
    newLend.id = lends.length + 1
    newLend.borrowedAt = new Date().toLocaleDateString('de-CH')
    newLend.returnedAt = null

    if(isValid(newLend))
        return res.sendStatus()

    lends.push(newLend)
    res.json(newLend)
    // const book = books.find((b) => b.isbn === lendData.isbn);

    // if (!book) {
    //     res.status(404).json({ error: 'Book not found' });
    //     return;
    // }

    // const isBookAlreadyLent = lends.some((l) => l.isbn === lendData.isbn && !l.returned_at);
    // if (isBookAlreadyLent) {
    //     res.status(422).json({ error: 'The book is already borrowed' });
    //     return;
    // }

    // const customerLendsCount = lends.filter((l) => l.customer_id === lendData.customer_id && !l.returned_at).length;
    // if (customerLendsCount >= 3) {
    //     res.status(422).json({ error: 'The customer already has 3 borrowed books' });
    //     return;
    // }

    // const newLend = {
    //     id: lends.length + 1,
    //     customer_id: lendData.customer_id,
    //     isbn: lendData.isbn,
    //     borrowed_at: new Date().toLocaleDateString('de-CH'),
    //     returned_at: null,
    // };

    // lends.push(newLend);
    // res.status(201).json(newLend);
});

app.patch('/lends/:id', isAuthenticated, (req, res) => {
    const lendIndex = lends.findIndex(lend => lend.id === req.params.id)

    if (lendIndex < 0)
        res.sendStatus(404)

    const updatedParams = (({isbn, customerId, returnedAt}) => ({isbn, customerId, returnedAt}))(request.body)
    const updatedLend = { ...lends[lendIndex], ...request.body }

    console.log(updatedLend)

    if (isValid(updatedLend)) return res.sendStatus(422)

    lends.splice(lendIndex, 1, updatedLend)
    res.json(updatedLend)

    // const lendId = req.params.id;
    // const lendUpdates = req.body;
    // const lend = lends.find((l) => l.id === parseInt(lendId));
    
    // if (!lend) {
    //     res.status(404).json({ error: 'Lend not found' });
    //     return;
    // }

    // lend.customer_id = lendUpdates.customer_id || lend.customer_id;
    // lend.isbn = lendUpdates.isbn || lend.isbn;
    // lend.returned_at = lendUpdates.returned_at || lend.returned_at;

    // res.json(lend);
});

const secretAdminCredentials = { email: "desk@library.example", password: "m295"}

app.post("/login", function (req, res) {
    const {email, password} = req.body

    if (email?.toLowerCase() === secretAdminCredentials.email && password === secretAdminCredentials.password){
        req.session.authenticated = true
        req.session.email = email
        return res.status(200).json({email: req.session.email})
    }
    return res.status(401).json({error: "Invalid Credentials"})
})

app.get("/verify", function (req, res) {
    if (req.session.authenticated)
        return res.status(200).json({email: req.session.email})
    return res.status(401).json({error: "Not logged in"})
})

app.delete("/logout", function (req, res) {
    req.session.authenticated = false
    delete req.session.email
    return res.sendStatus(204)
})

function isAuthenticated(req, res, next){
    if (req.session.authenticated)
        next()
    else {
       res.status(401).json({error: "Not logged in"})
    }
}


function isValid(lend){
    return lend.isbn != undefined && lend.isbn != "" &&
    lend.customerId != undefined && lend.customerId != "" &&
    lend.borrowedAt != undefined && lend.borrowedAt != "" &&
    lend.returnedAt == null || Date.parse(lend.returnedAt != NaN)
}

// function isLendAble() {
//     let customerLend = 0
//     let booksLends = 0

//     lends.forEach.otherLend => {
//         if(lend.isbn == otherLend.isbn && otherLend.returnedAt == null)
//     }

//     return costumerLends <= 3 && bookLends < 1
// }

app.listen(port, () => {
    console.log(
        "The app is running on port: " + port, 
        `\nYou can open your browser on: http://localhost:${port}`)
})
