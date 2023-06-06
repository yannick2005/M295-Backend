'use strict'

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get("/now", (response, request) => {
    let time = new Date().toLocaleTimeString();
    const timeZone = 'America/New_York';

    response.send(time)
})

app.post("/name", (response, request) => {
    
})







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})