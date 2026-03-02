const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc get all users (admin only )
//@route get/api/users/
//@access private (admin)

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'member' }).select("-password");

        //add task counts to each user
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
            const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

            return {
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            };
        })
        );

        res.json(userWithTaskCounts);
    }
    catch (error) {
        res.status(500).json({ message: "Server error ", error: error.message });
    }
};

//@desc  get user by id
//@route get/api/users/:id
//@access private

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error ", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, profileImageUrl } = req.body;

        // Ensure user can only update their own profile unless admin
        if (req.user.id !== req.params.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update this user" });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (profileImageUrl !== undefined) user.profileImageUrl = profileImageUrl;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImageUrl: updatedUser.profileImageUrl,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { getUsers, getUserById, updateUser };