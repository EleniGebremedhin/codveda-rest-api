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
app.put("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.json(task);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
