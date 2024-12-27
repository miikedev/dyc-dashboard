import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import AuthLayout from './components/authLayout'
import Dashboard from './pages/dashboard'
import Settings from './pages/setting'
import Login from './pages/Login'
import Register from './pages/register'

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
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="courses" element={<Dashboard />} />
          <Route path="recent" element={<Dashboard />} />
          <Route path="my-courses" element={<Dashboard />} />
          <Route path="manage" element={<Dashboard />} />
          <Route path="enrollment" element={<Dashboard />} />
          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

