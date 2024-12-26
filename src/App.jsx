import Dashboard from './pages/Dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/layout'
import Settings from './pages/setting'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="courses" element={<Dashboard />} />
          <Route path="recent" element={<Dashboard />} />
          <Route path="my-courses" element={<Dashboard />} />
          <Route path="manage" element={<Dashboard />} />
          <Route path="enrollment" element={<Dashboard />} />
          {/* Redirect any unmatched routes to the dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

