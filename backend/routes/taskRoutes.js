const express = require("express");
const {protect,adminOnly} = require("../middlewares/authMiddleware");

const router = express.Routes();

//task management routes
router.get("/dashboard-data", protect,getDashboardData);
router.get("/user-dashboard-data", protect,getDashboardData);
router.get("/", protect,getTasks);
router.get("/:id", protect,getTaskById);
router.post("/", protect,adminOnly,createTask);
router.put("/:id", protect,updateTask);
router.delete("/:id", protect,adminOnly,deleteTask);
router.put("/:id/status" ,protect,updateTaskStatus);
router.put("/:id/todo" ,protect,updateTaskChecklist);


module.export = router;