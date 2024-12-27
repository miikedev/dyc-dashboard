import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  )
}