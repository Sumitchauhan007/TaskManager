require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();


//middleware to handle cors

app.use(
    cors({
         origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//connect to database
connectDB();

//middleware 
app.use(express.json());



//Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users",userRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/reports", reportRoutes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
