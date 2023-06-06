'use strict'

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/now', (req, res) => {
    let time = new Date().toLocaleTimeString('de-CH', { timeZone: req.query.q });
    res.send(time);
});

app.post('/name', (req, res) => {
    const { firstName, lastName } = req.query;
    const name = createName(firstName, lastName);
    res.send(name);
});

app.get("/name", (req, res, name) => {
    res.send(name)
})

function createName(firstName, lastName) {
    // Logic to create a name using the provided firstName and lastName
    // Example: return firstName + ' ' + lastName;
    return `${firstName} ${lastName}`;
}

createName("Daniel", "Boulter")





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})