const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory task list
let tasks = [
  { id: 1, title: "Deploy app to Azure", done: false },
  { id: 2, title: "Complete assignment report", done: false }
];

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Get all tasks (JSON)
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send("Title required");
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  res.json(newTask);
});

// Mark a task as done
app.post("/tasks/:id/done", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).send("Task not found");
  task.done = true;
  res.json(task);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
