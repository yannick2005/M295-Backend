'use strict';

// importing needed resources
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

// Setting cookie and other stuff
app.use(express.json())

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Application sided
const secretAdminCredentials = {password: "m295"}

const tasks = [
  {id: 1, title: "Do laundry", description: "The laundry should be clean every day", due: "", done: false},
  {id: 2, title: "Do the dishes", description: "The table should be dished", due: "", done: false},
  {id: 3, title: "Pack suitcase", description: "The suitcase must contain the most relevant items", due: "", done: true}
];

function isValid(task){
  return task.title != undefined && task.title != "" &&
  task.due != undefined && task.due != "";
};

app.get("/tasks", function (req, res) {
  res.json(tasks);
});

app.post("/tasks", function (req, res) {
  const newTask = req.body;

  if (isValid(newTask)){
    tasks.push(newTask);
    return res.status(201).json(newTask);
  }
  return res.sendStatus(422)
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task){
    res.json(task);
  } else {
    res.status(404).send("Task not found. Try another id");
  }
});

app.put("/tasks/:id", function (req, res) {
  const id = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.status(201).json(tasks[taskIndex]);
  } else {
    res.status(404).send("Task not found.");
  }
});

app.delete("/tasks/:id", function (req, res) {
  const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task !== -1) {
        const deletedTask = tasks.splice(task, 1);
        res.json(deletedTask[0]);
    } else {
        res.status(404).send("Task not found.");
    }
});

// authorization
app.post("/login", function(req, res) {
  const {email, password} = req.body

    if (email != undefined || email != "" && password === secretAdminCredentials.password){
        req.session.authenticated = true
        req.session.email = email
        res.status(200).json({email: req.session.email})
    } else {
      res.status(401).json({error: "Invalid Credentials"})
    }
});

app.get("/verify", function(req,  res) {
  if (req.session.authenticated){
    res.status(200).json({email: req.session.email})
  } else {
    res.status(401).json({error: "Not logged in"})
  }
});

app.delete("/logout", function(req, res) {
  if(req.session.email){
    req.session.authenticated = false
    delete req.session.email
    res.send("Successfully logged out").status(204)
  } else {
    res.send("Your already logged out")
  }
})


app.listen(
    port, 
    console.log(`Listening on port ${port}`)
)