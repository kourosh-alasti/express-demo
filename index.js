const express = require('express');
const app = express();
const port = 3000;

// JSON Parsing Middleware
app.use(express.json());
// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
})

app.get('/', (req, res) => {
  res.send("Hello World!");
})

let tasks = [
  { id: 1, name: 'Buy Groceries', completed: true },
  { id: 2, name: 'Do Laundry', completed: false }
]

app.get('/tasks', (req, res) => {
  res.json(tasks);
})

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  res.json(task);
})

app.post('/tasks', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Missing task name");
  }

  const newTask = {
    id: tasks.length + 1,
    name: req.body.name,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})
