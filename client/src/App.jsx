import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login.jsx'
import Signup from './pages/Auth/Signup.jsx'

import Dashboard from './pages/Admin/Dashboard.jsx'
import ManageTask from './pages/Admin/ManageTask'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'


import UserDashboard from './pages/User/UserDashboard.jsx'
import MyTask from './pages/User/MyTask.jsx'

import PrivateRoute from './routes/PrivateRoute.jsx'






const App = () => {
  return (
   <div>
    <Router>
      <Routes>
        {/* ! Auth Routes  */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<Signup/>}/>


        {/* ! Admin Routes  */}
        <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/tasks' element={<ManageTask/>}/>
            <Route path='/admin/create-task' element={<CreateTask/>}/>
             <Route path='/admin/users' element={<ManageUsers/>}/>
        </Route>

        {/*  */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path='/user/dashboard' element={<UserDashboard/>}/>
        <Route path='/user/my-task' element={<MyTask/>}/>

        </Route>


      </Routes>
    </Router>
   </div>
  )
}

export default App
