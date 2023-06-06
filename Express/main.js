const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

// displays hello world!
app.get("/", (request, response) => {
    response.send("Hello World!")
})

// display current time
app.get("/now", (request, response) => {
    const time = new Date().toLocaleString("de-CH");
    response.send(time);
})

// redirect to website of ZLI
app.get("/zli", (request, response) =>{
    response.redirect("https://www.zli.ch")
})

// Picks random name
app.get("/name", (request, response) => {
    const names = [
        "Daniel", "Yannick", "Matas", "Michi", "Theodor",
        "Ruben", "Robin", "Giuseppe", "Liam", "Leon", 
        "Sven", "Manuel", "Marcel", "Irene", "Sakin", 
        "Zubair", "Robert", "Alexander", "Simon", "Leonardo"
    ]

    const random = names[Math.floor(Math.random() * names.length)];
    response.send(random);
})

// html converted text of the server
app.get("/html", (request, response) => {
    response.sendFile(`${__dirname}/index.html`)
})

app.get("/image", (request, response) => {
    response.sendFile(`${__dirname}/img.jpg`)
})

app.get("/teapot", (request, response) => {
    response.sendStatus(418)
})

app.get("/user-agent", (request, response) => {
    const userAgent = request.headers["user-agent"]

    response.send(userAgent);
    // response.json({userAgent: request.headers("user-agent")})    
})

app.get("/secret", (request, response) => {
    response.sendStatus(401);
})

app.get("/xml", (request, response) => {
    fs.readFile('static.xml', (err, data) => {
        if(err){
            response.sendStatus("500");
        } else {
            response.type("xml")
            response.send(data)
        }
    })
})

app.get("/me", (request, response) => {
    const me = {
        firstName: "Yannick",
        lsatName: "Schönhaar",
        age: 17,
        place: "Kloten"
    }
    response.json(me)
})

// listens to port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})