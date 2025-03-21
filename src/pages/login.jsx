import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { login } from '@/apis/auth'
export default function Login({setIsAuthenticated}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(""); // To track any login errors
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
  
    try {
      const response = await login(email, password); // Call login function
      console.log("response", response);
  
      if (!response || response.status !== 200) {
        setError(response?.message || "Login failed. Please try again.");
        return;
      }
  
      // Store token and update authentication state
      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setIsAuthenticated(true);
        navigate("/dashboard/overviews"); // Redirect after login
      } else {
        setError("Invalid login response. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

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

