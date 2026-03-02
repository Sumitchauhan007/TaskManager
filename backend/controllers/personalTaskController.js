const PersonalTask = require("../models/PersonalTask");

// @desc  Get all personal tasks for the logged-in user
// @route GET /api/personal-tasks
// @access Private
const getPersonalTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { createdBy: req.user._id };
    if (status) filter.status = status;

    let tasks = await PersonalTask.find(filter).sort({ createdAt: -1 });

    tasks = tasks.map((task) => {
      const completedTodoCount = task.todoChecklist.filter((t) => t.completed).length;
      return { ...task._doc, completedTodoCount };
    });

    const all           = await PersonalTask.countDocuments({ createdBy: req.user._id });
    const pendingTasks  = await PersonalTask.countDocuments({ createdBy: req.user._id, status: "Pending" });
    const inProgressTasks = await PersonalTask.countDocuments({ createdBy: req.user._id, status: "In Progress" });
    const completedTasks  = await PersonalTask.countDocuments({ createdBy: req.user._id, status: "Completed" });

    res.json({
      tasks,
      statusSummary: { all, pendingTasks, inProgressTasks, completedTasks },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc  Get single personal task by ID (owner only)
// @route GET /api/personal-tasks/:id
// @access Private
const getPersonalTaskById = async (req, res) => {
  try {
    const task = await PersonalTask.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc  Create a personal task
// @route POST /api/personal-tasks
// @access Private
const createPersonalTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, todoChecklist } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const todoItems = Array.isArray(todoChecklist)
      ? todoChecklist.map((item) =>
          typeof item === "string" ? { text: item, completed: false } : item
        )
      : [];

    const task = await PersonalTask.create({
      title,
      description,
      priority,
      dueDate,
      todoChecklist: todoItems,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Personal task created", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc  Update a personal task
// @route PUT /api/personal-tasks/:id
// @access Private
const updatePersonalTask = async (req, res) => {
  try {
    const task = await PersonalTask.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description, priority, status, dueDate, todoChecklist } = req.body;

    if (title !== undefined)       task.title       = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined)    task.priority    = priority;
    if (status !== undefined)      task.status      = status;
    if (dueDate !== undefined)     task.dueDate     = dueDate;

    if (Array.isArray(todoChecklist)) {
      task.todoChecklist = todoChecklist.map((item) =>
        typeof item === "string" ? { text: item, completed: false } : item
      );
    }

    // Auto-calculate progress
    if (task.todoChecklist.length > 0) {
      const done = task.todoChecklist.filter((t) => t.completed).length;
      task.progress = Math.round((done / task.todoChecklist.length) * 100);
    } else {
      task.progress = status === "Completed" ? 100 : 0;
    }

    const updated = await task.save();
    res.json({ message: "Task updated", task: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc  Delete a personal task
// @route DELETE /api/personal-tasks/:id
// @access Private
const deletePersonalTask = async (req, res) => {
  try {
    const task = await PersonalTask.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc  Toggle a todo item within a personal task
// @route PUT /api/personal-tasks/:id/todo
// @access Private
const updatePersonalTaskTodo = async (req, res) => {
  try {
    const { todoChecklist } = req.body;

    const task = await PersonalTask.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.todoChecklist = todoChecklist;

    if (task.todoChecklist.length > 0) {
      const done = task.todoChecklist.filter((t) => t.completed).length;
      task.progress = Math.round((done / task.todoChecklist.length) * 100);
      if (task.progress === 100) task.status = "Completed";
      else if (task.progress > 0) task.status = "In Progress";
      else task.status = "Pending";
    }

    const updated = await task.save();
    res.json({ message: "Checklist updated", task: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getPersonalTasks,
  getPersonalTaskById,
  createPersonalTask,
  updatePersonalTask,
  deletePersonalTask,
  updatePersonalTaskTodo,
};
