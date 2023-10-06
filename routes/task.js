const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");

// Get tasks.
router.get("/gettask", fetchUser, async (req, res) => {
  try {
    const response = await Task.find({ user: req.user.id });
    res.json(response);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Add task.
router.post("/addtask", fetchUser, async (req, res) => {
  const { task } = req.body;

  try {
    const data = new Task({
      task,
      user: req.user.id,
    });
    const response = await data.save();
    res.json(response);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// Update Task
router.put("/updatetask/:id", fetchUser, async (req, res) => {
  const { task } = req.body;

  const newTask = {};
  if (task) {
    newTask.task = task;
  }

  let taskItem = await Task.findById(req.params.id);
  if (!taskItem) {
    return res.status(404).send("Not found.");
  }

  if (taskItem.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  data = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: newTask },
    { new: true }
  );

  res.json(data);
});

// Delete Task.
router.delete("/deletetask/:id", fetchUser, async (req, res) => {
  try {
    let getTask = await Task.findById(req.params.id);

    if (!getTask) {
      return res.status(404).json({ error: "No task found with this id." });
    }

    response = await Task.findByIdAndDelete(req.params.id);
    res.json({ success: "Task deleted." });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
