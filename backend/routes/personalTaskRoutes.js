const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getPersonalTasks,
  getPersonalTaskById,
  createPersonalTask,
  updatePersonalTask,
  deletePersonalTask,
  updatePersonalTaskTodo,
} = require("../controllers/personalTaskController");

const router = express.Router();

router.get("/",           protect, getPersonalTasks);
router.get("/:id",        protect, getPersonalTaskById);
router.post("/",          protect, createPersonalTask);
router.put("/:id",        protect, updatePersonalTask);
router.delete("/:id",     protect, deletePersonalTask);
router.put("/:id/todo",   protect, updatePersonalTaskTodo);

module.exports = router;
