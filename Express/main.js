const express = require('express')
const app = express()
const port = 3000

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
    let names = [
        {name: "Daniel"}, {name: "Yannick"}, {name: "Matas"}, {name: "Michi"}, {name: "Theodor"}, 
        {name: "Ruben"}, {name: "Robin"}, {name: "Giuseppe"}, {name: "Liam"}, {name: "Leon"}, 
        {name: "Sven"}, {name: "Manuel"}, {name: "Marcel"}, {name: "Irene"}, {name: "Sakin"},
        {name: "Zubair"}, {name: "Robert"}, {name: "Alexander"}, {name: "Simon"}, {name: "Leonardo"},
    ]

    const random = Math.floor(Math.random() * names.length);
    response.send(names[random]);
})

// html converted text of the server
app.get("/html", (request, response) => {
    
})

// listens to port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})