import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement your login logic here
    console.log('Login attempt', { email, password })
    // For demo purposes, we'll just set a token and redirect
    localStorage.setItem('token', 'demo-token')
    navigate('/dashboard/course')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Login</Button>
      <p className="text-center">
        Don't have an account? <Link to="/register" className="text-primary">Register</Link>
      </p>
    </form>
  )
}

