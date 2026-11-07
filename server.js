const express = require("express");
const cors = require("cors");
const dns = require("node:dns");

dns.setServers(["192.168.0.1"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/Task");

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

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    const formattedTasks = tasks.map((task) => ({
      ...task.toObject(),
      id: task._id.toString(),
    }));

    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tasks",
    });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const newTask = await Task.create({
      title: title.trim(),
    });

    res.status(201).json({
      ...newTask.toObject(),
      id: newTask._id.toString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    // Find task in MongoDB
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Validate and update title
    if (req.body.title !== undefined) {
      if (typeof req.body.title !== "string" || req.body.title.trim() === "") {
        return res.status(400).json({
          message: "Title must be a non-empty string",
        });
      }

      task.title = req.body.title.trim();
    }

    // Validate and update completed status
    if (req.body.completed !== undefined) {
      if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be true or false",
        });
      }

      task.completed = req.body.completed;
    }

    // Save changes to MongoDB
    await task.save();

    res.json({
      ...task.toObject(),
      id: task._id.toString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    // Find and delete task from MongoDB
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      task: {
        ...deletedTask.toObject(),
        id: deletedTask._id.toString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  next(err);
});
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

startServer();
