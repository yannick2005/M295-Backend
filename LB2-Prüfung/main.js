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
const secretPassword = {password: "m295"}

const tasks = [
  {id: 1, title: "Do laundry", description: "The laundry should be clean every day", due: "2023-06-15", done: false},
  {id: 2, title: "Do the dishes", description: "The table should be dished", due: "2023-06-20", done: false},
  {id: 3, title: "Pack suitcase", description: "The suitcase must contain the most relevant items", due: "2023-08-10", done: true}
];

function isAuthenticated(req, res, next){
  if (req.session.authenticated)
      next()
  else {
     res.status(403).json({error: "Not logged in"})
  }
}

function isValid(task){
  return task.title != undefined && task.title != "" &&
  task.description != undefined && task.description != "" &&
  task.due != undefined && task.due != "";
};

app.get("/tasks", isAuthenticated, function (req, res) {
  res.json(tasks).status(200);
});

app.post("/tasks", isAuthenticated, function (req, res) {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    due: req.body.due,
    done: false
  };

  if (isValid(newTask)){
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.sendStatus(422)
  }
});

app.get("/tasks/:id", isAuthenticated, function (req, res) {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task){
    res.json(task).status(200);
  } else {
    res.status(404).send("Task not found. Try another id");
  }
});

app.put("/tasks/:id", isAuthenticated, function (req, res) {
  const id = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.status(201).json(tasks[taskIndex]);
  } else {
    res.status(404).send("Task not found. Try another id");
  }
});

app.delete("/tasks/:id", isAuthenticated, function (req, res) {
  const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task !== -1) {
        const deletedTask = tasks.splice(task, 1);
        res.json(deletedTask[0]).status(204);
    } else {
        res.status(404).send("Task not found. Try");
    }
});

// authorization
app.post("/login", function(req, res) {
  const {email, password} = req.body

    if (email != undefined && email.includes("@") || email != "" && email.includes("@") && password === secretPassword.password){
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
    res.send("You're already logged out")
  }
})

// Not existing endpoints
app.use(function (req, res){
  res.status(404).json({error: "Endpoint doesn't exist"})
})

app.listen(
    port, 
    console.log(`Listening on port ${port}`)
)

// automated tests
function testing(){
  const task = {
    title: "ds", description: "get some information", due: "2023-09-10"
  }

  if(isValid(task))
    return console.log("Test passed")
  return console.log("Something went wrong")
}
testing()