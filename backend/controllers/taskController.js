const Task = require("../models/Task");

//@desc get all task s(admin: all , userz:only assigned tasks)
//@route get/api/tasks/
//@acess private 

const getTasks = async (req,res) => {
    try {
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    }
    };

//@desc get task by id
//@routr get/api/tasks/:id
//@access private 

const getTaskById = async (req, res) => {};

//@desc create a new task (admin only)
//@route post /api/tasks/
//@access private(admin)
const createTask = async (req,res) => {};

//@desc update task details
//@route put/API/tasks/:id
//@access private
const updateTask = async(req,res) => {};


//@desc delete a task (admin only)
//@route delete /api/tasks/:id
//@access private (admin)
const deleteTask = async(req,res) => {};

//@desc Update task status
//@route put/api/tasks/:id/status
//@access Private
const updateTaskStatus = async(req,res) => {};

//@desc update task checklist
//@route put/api/tasks/:id/todo
//@access private 
const updateTaskChecklist = async(req,res) => {};

//@desc