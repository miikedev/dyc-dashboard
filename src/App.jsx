import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from './components/authLayout'
import Layout from './components/layout'
import Course from './pages/course'
import Login from './pages/login'
import Register from './pages/register'
import Settings from './pages/setting'
import Module from './pages/module'
import { useQueryState } from 'nuqs'
import Activity from './pages/activity'

// This is a mock function. Replace it with your actual auth check
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null
}

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout/>
            </ProtectedRoute>
          }
        >
          <Route path="course" element={<Course />} />
          <Route path="course/:courseId/module" element={<Module/>} />
          <Route path="course/:courseId/module/:moduleId/activity" element={<Activity />} />
          <Route path="settings" element={<Settings />} />
          <Route path="courses" element={<Course />} />
          <Route path="recent" element={<Course />} />
          <Route path="my-courses" element={<Course />} />
          <Route path="manage" element={<Course />} />
          <Route path="enrollment" element={<Course />} />
          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/dashboard/course" replace />} />
        </Route>
        {/* Catch all route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

