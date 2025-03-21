import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
import Overviews from './pages/overviews'
import Candidates from './pages/candidates'
import Subscribers from './pages/subscribers'
import Blogs from './pages/blogs'
import Newsletter from './pages/newsletter'

const checkAuth = () => !!localStorage.getItem('token');

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(checkAuth()); // Update state when token changes
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Layout Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        >
          <Route path="overviews" element={<Overviews />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="newsletter" element={<Newsletter />} />
          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/dashboard/overviews" replace />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
