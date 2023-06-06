'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const FormHelper = bodyParser.urlencoded();

let createdName = ''; // Variable to store the created name

app.get('/now', (req, res) => {
    let time = new Date().toLocaleTimeString('de-CH', { timeZone: req.query.q });
    res.send(time);
});

app.post('/name', (req, res) => {
    const { firstName, lastName } = req.query;
    createdName = createName(firstName, lastName); // Update the createdName variable
    res.send(createdName);
});

app.get('/name', (req, res) => {
    res.send(createdName); // Send the stored createdName
});

function createName(firstName, lastName) {
    // Logic to create a name using the provided firstName and lastName
    // Example: return firstName + ' ' + lastName;
    return `${firstName} ${lastName}`;
}

createName('Daniel', 'Boulter');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});