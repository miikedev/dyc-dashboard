import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from './components/authLayout'
import Layout from './components/layout'
import Course from './pages/course'
import Login from './pages/login'
import Register from './pages/register'
import Settings from './pages/setting'
import Module from './pages/module'
import Activity from './pages/activity'
import Manage from './pages/manage'
import Enroll from './pages/enroll'
import { useEffect, useState } from 'react'
import Overviews from './pages/overviews'
import Candidates from './pages/candidates'
import Subscribers from './pages/subscribers'
import Blogs from './pages/blogs'
import Newsletter from './pages/newsletter'

const checkAuth = () => {
  return localStorage.getItem('token') !== null
}

const ProtectedRoute = ({ children }) => {
  if (!checkAuth()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(checkAuth()); // Update state on localStorage change
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated]);
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
              <Layout setIsAuthenticated={setIsAuthenticated}/>
            </ProtectedRoute>
          }
        >
          <Route path="overviews" element={<Overviews />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="newsletter" element={<Newsletter />} />



          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/dashboard/course" replace />} />
        </Route>
        {/* Catch all route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

