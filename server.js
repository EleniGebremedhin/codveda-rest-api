const express = require("express");

const app = express();

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
