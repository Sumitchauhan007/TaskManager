import React, { useContext } from 'react'
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
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
import UserProvider, { UserContext } from './context/UserContext';
import ThemeProvider from './context/ThemeContext';
import PersonalTasks from './pages/User/PersonalTasks';

const App = () => {
  return (
    <ThemeProvider>
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="card text-center p-10">
                <h2 className="text-xl font-bold text-white/80">Unauthorized Access</h2>
                <p className="text-sm text-white/40 mt-2">You don't have permission to view this page.</p>
              </div>
            </div>
          } />

          {/* Default redirect handler */}
          <Route path="/" element={<Root />} />

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={["member"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
          </Route>

          {/* Shared routes (admin + member) */}
          <Route element={<PrivateRoute allowedRoles={["admin", "member"]} />}>
            <Route path="/personal-tasks" element={<PersonalTasks />} />
          </Route>
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
            background: "var(--modal-bg)",
            color: "var(--text-1)",
            border: "1px solid var(--border-str)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          },
        }}
      />
    </UserProvider>
    </ThemeProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin"
    ? <Navigate to="/admin/dashboard" />
    : <Navigate to="/user/dashboard" />;
};
