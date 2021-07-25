"use strict";

const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodoByParams,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  pendingTodos,
  completedTodos,
} = require("../controllers/todoController");
const {
  todoValidationRules,
  validateTodo,
} = require("../middlewares/validator");

router.get("/", getTodos);
router.get("/completed", completedTodos);
router.get("/pending", pendingTodos);
router.get("/:searchBy", getTodoByParams);
router.post("/create", [todoValidationRules(), validateTodo], createTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.delete("/delete", deleteTodos);
module.exports = router;
