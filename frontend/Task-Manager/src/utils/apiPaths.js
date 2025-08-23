export const BASE_URl = "http://localhost:8000";

//utils/api/paths.js

export const API_PATHS = {
    AUTH:{
        REGISTER:"/api/auth/register",//register a new user (admin or member)
        LOGIN:"/api/auth/login",//authenticate user and return JSWT token
        GET_PROFILE:"/api/auth/profile",//get logged in-user dtails
    },


    USERS:{
        GET_ALL_USERS: "/api/users",//get all users (admin only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // get user by ID
        CREATE_USER: "/api/users",//create a new user (admin only)
        UPDATE_USER: (userId) =>`/api/users/${userId}`,//update user details
        DELETE_USER: (userId) =>`/api/users/${userId}`, //delete a user
    },

    TASKS:{
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", //get dashboard data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",//get user dashboard data
        GET_ALL_TASKS:"/api/tasks", //get all tasks (admin:all ,User:only asisigned)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,
        CREATE_TASK: "/api/tasks", //create a new task (admin only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,//update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,//delete task(admin only)
        YPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,//update task 
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,//update todo 
    },

    REPORTS:{
        EXPORT_TASKS: "/api/reports/exports/export/tasks", //download all tasks as ana excel sheet/file
        EXPORT_USERS: "/api/reports/exports/export/users", //download user-task report
    },

    IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image",
    },
};