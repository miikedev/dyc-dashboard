import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { login } from '@/apis/auth'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(""); // To track any login errors
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(""); // Reset any previous error
    try {
      const response = await login(email, password); // Call login with email and password
      console.log("response", response);
      if (response.status > 400) {
        setError(response.message);
        return;
      }
      localStorage.setItem("token", response.accessToken); // Assuming your response has a token field
      navigate("/dashboard/overviews"); // Redirect on successful login
    } catch (e) {
      console.log(e);
      setError(e.message); // Set error message if login fails
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col justify-center gap-y-[.5rem]">
        <img src="/logo.svg" className=" mx-auto w-[3rem]" />
        <h1 className="text-2xl font-bold text-center">
          Democratic Youth Council Dashboard
        </h1>
        <h2 className="text-xl font-semibold text-center">Login</h2>
      </div>
      {error && <p className="text-red-600 text-center">{error}</p>}{" "}
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

