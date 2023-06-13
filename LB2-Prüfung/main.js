'use strict'

const express = require("express")
const session = require("express-session")
const app = express()
const port = 3000

const tasks = [
  {id: 1, title: "Do laundry", description: "", due: "", done: false},
  {id: 2, title: "Do the dishes", description: "", due: "", done: false},
  {id: 3, title: "Pack suitcase", description: "", due: "", done: false}
]

app.use(express.json())

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/tasks", function (req, res) {
  res.json(tasks)
})

app.post("/tasks", function (req, res) {
  const task = req.body

  if (task){
    tasks.push(task)
    res.sendStatus(201)
  }
  res.sendStatus()
})

app.put("/tasks", function (req, res) {

})

app.delete("/tasks", function (req, res) {

})


app.listen(
    port, 
    console.log(`Listening on port ${port}`)
)