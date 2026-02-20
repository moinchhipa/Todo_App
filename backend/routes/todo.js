const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/authMiddleware");

//Create todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("Title:", req.body.title);
    console.log("User id:", req.userId);

    const todo = new Todo({
      title: req.body.title,
      user: req.userId,
    });

    await todo.save();

    res.json({ message: "Todo saved" });
  } catch (e) {
    console.log(e);
  }
});

//Get todo
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });

    res.json(todos);
  } catch (e) {
    console.log(e);
  }
});

//Update todo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true },
    );

    if (!updatedTodo) {
      return res.json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (e) {
    console.log(e);
  }
});

//Delete todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    res.json({ message: "todo deleted" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
