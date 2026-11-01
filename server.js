const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
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
  const title = req.body?.title;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required and must be a non-empty string",
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "Task ID must be a positive integer",
    });
  }

  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (req.body.title !== undefined) {
    if (typeof req.body.title !== "string" || req.body.title.trim() === "") {
      return res.status(400).json({
        message: "Title must be a non-empty string",
      });
    }

    task.title = req.body.title.trim();
  }

  if (req.body.completed !== undefined) {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be true or false",
      });
    }

    task.completed = req.body.completed;
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      message: "Task ID must be a positive integer",
    });
  }

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  next(err);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
