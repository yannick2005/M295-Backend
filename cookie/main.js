'use strict'

const express = require('express');
const session = require('express-session')
const app = express()

app.use(express.json())

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.post("/name", (req, res) => {
    const name = req.query.name
    req.session.name = name
    
    if(name || name != "")
        return res.sendStatus(201)
    res.sendStatus(422)
})

app.get("/name", (req, res) => {
    const name = req.session.name
    
    if(name || name != "")
        return res.send(name)
    res.sendStatus(404)
})

app.delete("/name", (req, res) => {
    delete req.session.name
    res.send("Successfully deleted").status(204)
})

app.get('/', function (request, response, _) {
    request.session
    request.session.views = (request.session.views || 0) + 1
    // console.log(request.session)
    
    response.end(request.session.views + ' views')
})

app.listen(
    3000, 
    console.log("listening on port: 3000")
)