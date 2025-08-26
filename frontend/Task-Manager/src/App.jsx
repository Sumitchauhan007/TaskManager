import React from 'react'
import {
  BrowserRouter as Router, // Use BrowserRouter as Router alias
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import PrivateRoute from './routes/PrivateRoute';
import UserProvider from './context/userContext';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> {/* Default route */}

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers/>} />
          </Route>

          {/* User routes - FIXED: Changed allowedRoles to ["user"] */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks/>} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails/>} />
          </Route>

        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App;