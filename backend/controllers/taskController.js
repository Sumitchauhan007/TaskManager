const Task = require("../models/Task");

//@desc get all task s(admin: all , userz:only assigned tasks)
//@route get/api/tasks/
//@acess private 

const getTasks = async (req,res) => {
    try {
        const {status} = req.query;
        let filter = {};

        if(status) {
            filter.status = status;

        }
        let tasks;
        if(req.user.role === "admin") {
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );

        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user._id}).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }

        //add completed todo checklist count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.completed
                ).length;
                return { ...task._doc, completedTodoCount: completedCount};
            })
        );
        

        //status summary counts
        const  allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : {assignedTo: req.user._id}
        );

       const pendingTasks = await Task.countDocuments({
        ...filter,
        status:"Pending",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
       });

       const inProgressTasks = await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
       });

       const completedTasks = await Task.countDocuments({
        ...filter,
        status:"Completed",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
       });

       res.json({
        tasks,
        statusSummary:{
            all: allTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks
        },
       });

    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    }
    };

//@desc get task by id
//@routr get/api/tasks/:id
//@access private 

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        if(!task) return res.status(404).json({message:"Task not found"});

        res.json(task);
    } catch (error){
        res.status(500).json({ message:"Server error", error: error.message});
    }
};

//@desc create a new task (admin only)
//@route post /api/tasks/
//@access private(admin)
const createTask = async (req,res) => {
   try {
    const {
        title,
        description,
        priority,
        dueDate,
        assignedto,
        attachments,
        todoChecklist,
    } = req.body;

    if(!Array.isArray(assignedto)) {
        return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }
    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        assignedto,
        createdBy: req.user._id,
        todoChecklist,
        attachments,
    });

    res.status(201).json({message:"Task creates successfully", task});
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    } 
};

//@desc update task details
//@route put/API/tasks/:id
//@access private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ message:"Task not found"});

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res
                .status(400)
                .json({message: "assignedTo must be an array of user Ids" });
            }
            task.assignedTo = req.body.assignedTo;
        }
        
        const updateTask = req.body.assignedTo;
        res.json({message: "Task updated successfully" ,updateTask });
        }
          catch (error) {
            res.status(500).json({ message:"Server error", error: error.message});
        }
    };


//@desc delete a task (admin only)
//@route delete /api/tasks/:id
//@access private (admin)
const deleteTask = async(req,res) => {
    try 
    {
     const task = await Task.findById(req.params.id);

     if(!task) return res.status(404).json({message:"Task not found"});

     await task.deleteOne();
     res.json({message: "Task deleted successfully"});
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    }};

//@desc Update task status
//@route put/api/tasks/:id/status
//@access Private
const updateTaskStatus = async(req,res) => {
    try 
    { 
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({message: "Task not found"});

        const isAssigned = task.assignedTo.some(
            (userId) => userId.toString() === req.user._id.tostring()
        );

        if(!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({message: "Not authorized"});
        }

        task.status = req.body.status || task.status;
        if (task.status === "Completed") {
            task.todoChecklist.forEach((item) => (item.completed = true));
            task.progress = 100;
        }

        await task.save();
        res.json({ message: "task status updated" , task});
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    }};

//@desc update task checklist
//@route put/api/tasks/:id/todo
//@access private 
const updateTaskChecklist = async(req,res) => {
    try {
        const {todoChecklist} = req.body;
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ message: "Task not found"});

        if(!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
            return res
            .status(403)
            .json({ message:"Not authorized to update Checklist"});
        }

        task.todoChecklist = todoChecklist;//replace with updated checklist

        //auto update progress based on checklist completion
        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ).length;
        const totalItems = task.todoChecklist.length;
        task.progress = 
        totalItems > 0 ? Math.round((completedCount /totalItems) * 100) : 0;

        //auto-mark task as completed if all items are checked
        if(task.progress === 100) {
            task.status = "Completed";
        } else if (task.progress > 0) {
            task.status = "In Progress";
        } else {
            task.status = "Pending";
        }
        
        await task.save();
        const updatedTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
        res.json({message:"Task checklist updated", task: updatedTask});
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    }
};

//@desc dashboard data (admin only)
//@route get/api/tasks/dashboard-data
//@access private
const getDashboardData = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({status: "Pending"});
        const completedTasks = await Task.countDocuments({status: "Completed"});
        const overdueTasks = await Task.countDocuments({
            status:{ $ne:"Completed"},
            dueDate:{$lt: new Date()},
        });

        //ensure all possible statuses are included
        const taskStatuses = ["Pending" , "In Progress","Completed"];
        const taskDistributionRaw = await task.aggregate([
        {
            $group:{
                _id:"$status",
                count: { $sum: 1},
            },
        },
        ]);
    const tasDistribution = taskStatuses.reduce((acc,status) => {
        const formattedKey = status.replace(/\s+/g, "");
        acc[formattedKey] = 
        taskDistributionRaw.find((item) =>item._id === status)?.count || 0;
        return acc;
    }, {});
    taskDistribution["All"] = totalTasks; //add total count to taskditribution

    //enensure all priority levels are included
    const taskPriorities = ["Low", "Medium","High"];
    const taskPriorityLevelsRaw = await Task.aggregate([
        {
            $group:{
                _id:"$priority",
                count:{$sum:1},
            },
        },
    ]);
    
    const taskPriorityLevels = taskPriorities.reduce((acc,priority) => {
        acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
        return acc;
    }, {});

    //feth recent 10 tasks 
    const recentTasks = await Task.find()
    .sort({createdAt: -1})
    .limit(10)
    .select("title status priority dueData createdAt");

    res.status(200).json({
        statistics:{
            totalTasks,
            pendingTasks,
            overdueTasks,
            completedTasks,
        },
        charts: {
            tasDistribution,
            taskPriorityLevels,
        },
        recentTasks,
    });
    
    } catch (error) {
        res.status(500).json({ message:"Server error", error: error.message});
    }
};

//@desc Dashboard  data (user-specific)
//@route get/api/tasks/user-dashboard-data
//@access private
const getUserDashboardData = async (req, res) => {
    try {
       const userId = req.user._id;

       //fetch statistics for user -specific tasks

       const totalTasks = await Task.countDocuments({assignedTo: userId});
       const pendingTasks = await Task.countDocuments({assignedTo: userId ,status:"Pending"});
       const completedTasks = await Task.countDocuments({assignedTo: userId ,status:"Completed"});
       const overdueTasks = await Task.countDocuments ({
        assignedTo: userId,
        status: {$ne: "Completed"},
        dueDate: {$lt: newdate()},
       });

       //taskDistribution by status
       const taskStatuses = ["Pending", "In Progress" , "Completed"];
       const taskDistributionRaw = await Task.aggregate([
        {
            $match: { assignedTo: userId} 
        },
        { $group: { _id: "$status" , count: {$sum: 1}}},
       ]);

       const taskDistribution = taskStatuses.reduce((acc,status) => {
        const formattedKey = status.replace(/\s+/g, "");
        acc[formattedKey] = 
        task
       })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData,

};