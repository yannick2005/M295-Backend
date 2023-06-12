const express = require("express")
const fs = require("fs")
const app = express()

// The names do not need to be declared on every request
const names = ["Leonardo", "Michelangelo", "Donatello", "Raphael"]

app.get('/now', (request, response) => {
  const now = new Date().toLocaleTimeString()
  response.send(`Es ist gerade: ${now}`)
});

app.get('/zli', (request, response) => {
  const to = "https://www.zli.ch"
  response.redirect(to)
  // response.setHeader("Location", to).sendStatus(302) would also work
});

app.get('/name', (request, response) => {
  const randomName = names[Math.floor(Math.random() * names.length)]
  response.send(`Hallo ${randomName}`)
});

app.get('/html', (request, response) => {
  // response.redirect('/static.html') does not work
  response.sendFile(__dirname + '/static.html') 
});

app.get('/image', (request, response) => {
  response
    .type('gif')
    .sendFile(__dirname + '/thumbs-up.gif')
});

app.get('/teapot', (request, response) => {
  response.sendStatus(418) 
});

app.get('/user-agent', (request, response) => {
  const userAgent = request.headers["user-agent"]
  response.send(`Du nutzt: ${userAgent}`)
});

app.get('/secret', (request, response) => {
  response.sendStatus(401)
});

app.get('/xml', (request, response) => {
  // another approach for sending files
  fs.readFile('static.xml', (err, data) => {
    if(err) {
      response.sendStatus("500");
    } else {
      response.type("xml")
      response.send(data)
    }
  })
});

app.get('/me', (request, response) => {
  const me = {
    "firstName": "Diego",
    "lastName": "Steiner",
    "age": "36",
    "place": "Uster"
  }
  // const json = JSON.stringify(me)
  // response.type("json")
  // response.send(json)
  // or
  response.json(me)

});

app.listen(3000)