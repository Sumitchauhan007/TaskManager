const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//auth routes
router.post("/register",registerUser); //for registering user
router.post("login",loginUser);//for login in of user
router.get("/profile",protect, getUserProfile); //get users profile
router.put("/profile", protect, updateUserProfile);//update progile

module.exports = router;
