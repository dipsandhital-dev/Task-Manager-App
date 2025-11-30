

// --- 1. Core React & Library Imports ---
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- 2. Page Imports: Authentication (Public) ---
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";

// --- 3. Page Imports: Admin Section (Protected) ---
import Dashboard from "./pages/Admin/Dashboard.jsx";
import ManageTask from "./pages/Admin/ManageTask";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

// --- 4. Page Imports: User Section (Protected) ---
import UserDashboard from "./pages/User/UserDashboard.jsx";
import MyTask from "./pages/User/MyTask.jsx";
import ViewTaskDetails from "./pages/User/ViewTaskDetails.jsx";

// --- 5. Component Imports: Route Guards ---
import PrivateRoute from "./routes/PrivateRoute.jsx";

/**
 * App Component
 *
 * Wraps the entire application in the Router provider and defines
 * the navigation structure using Routes.
 */
const App = () => {
  return (
    <div>
      {/* 
        <Router>: The high-level component that keeps the UI in sync with the URL.
      */}
      <Router>
        
        {/* 
          <Routes>: Looks through all its child <Route> elements and renders 
          the first one that matches the current URL.
        */}
        <Routes>
          
          {/* ============================================================== */}
          {/* PUBLIC ROUTES                                                  */}
          {/* These pages are accessible to anyone (no login required).       */}
          {/* ============================================================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />

          {/* ============================================================== */}
          {/* PROTECTED ADMIN ROUTES                                         */}
          {/* ============================================================== */}
          {/* 
            <PrivateRoute> acts as a "Wrapper" or "Guard".
            It checks if the user is logged in AND if they have the 'admin' role.
            If yes, it renders the child routes (Outlet). If no, it redirects them.
          */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTask />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* ============================================================== */}
          {/* PROTECTED USER ROUTES                                          */}
          {/* ============================================================== */}
          {/* 
            NOTE: Changed allowedRoles from 'admin' to 'user'. 
            Only regular users should access these pages. 
          */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/my-task" element={<MyTask />} />
            
            {/* 
              Dynamic Routing: ':id' acts as a variable.
              Example: /user/task-details/123 -> id is "123"
            */}
            <Route
              path="/user/task-details/:id"
              element={<ViewTaskDetails />}
            />
          </Route>

        </Routes>
      </Router>
    </div>
  );
};

export default App;