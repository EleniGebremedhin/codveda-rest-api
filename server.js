const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build a REST API", completed: false },
];

app.get("/", (req, res) => {
  res.send("Welcome to my Codveda REST API!");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
