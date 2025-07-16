const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middle ware to protect routes
const protect = async (req ,res,next) => {
    try {
        let token=req.headers.authorization;

        if(token && token.startsWith("Bearer")) {
            token = token.split("")[1];//extract token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.User = await User.findById(decoded.id).select("-password"); 
            next();

        } else {
            res.status(401).json({message: "Not authorized, no token"});
        }
    } catch (error) {
        res.status(401).json({message:"Token failed", error: error.message});
    }
};

//middlleware for admin access

const adminOnly = (req, res, next) => {
    if(req.User && req.User.role === "admin") {
        next();
    } else {
        res.status(403).json({message: "Access denied, admin only"});
    }
};


module.exports = {protect, adminOnly};