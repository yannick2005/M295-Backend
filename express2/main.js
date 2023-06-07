'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const FormHelper = bodyParser.urlencoded();

app.get('/now', (req, res) => {
    const timeZone = req.query.tz
    const now = new Date().toLocaleTimeString('de-CH', {timeZone: timeZone})
    res.send("Your current time is: " + now)
});

// app.get("/name", (req, res) => {
//     res.sendFile(__dirname + "/form.html")
// })

// app.post("/name", FormHelper,(req, res) => {
//     const name = req.body.name
//     res.send(`Hello ${name}, you are a Michi!`)
// })

const names = new Set["Yannick", "Daniel", "Raphael", "Michael"]

app.get("/names", (req, res) => {
    res.send(res.json(Array.from(names)))
})

app.post("/names", FormHelper, (req, res) => {
    const name = req.body.name
    name.push()
    res.sendStatus(201)
})

app.delete("/names", FormHelper,(req, res) => {
    const name = req.body.name
    if(names.has(name)){
        names.delete()
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

app.get("/secret2", (req, res) => {
    const auth = req.headers.auth
    if(auth === "Basic aGFja2VyOjEyMzQ="){
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
});

app.get("/chuck", (req, res) => {
    async function getJoke() {
        const jokeResponse = await fetch("https://api.chucknorris.io/jokes/random");
        const joke = await jokeResponse.json();
        res.send(joke.value);
    }
    getJoke();
});

app.get("/me", (req, res) => {
    const me = {
        name: "Yannick",
        surname: "Schönhaar",
        age: 17,
        location: "Kloten",
        street: "Bienenweg",
        number: "11d"
    };
    res.send(me);
});

app.patch("/me", (req, res) => {
    const authHeader = req.header('Authorization');
    if (authHeader === authHeaderMessage) {
        const updatedMe = {
            name: "Irene",
            surname: "Schönhaar"
        };
        res.send(updatedMe);
    } else {
        res.status(401).send('Authentication error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});