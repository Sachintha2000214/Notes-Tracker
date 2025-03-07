import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: '',
  });

  const { registerNumber, password } = formData;
  const navigate = useNavigate(); // Initialize navigate function

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/user/login', {
        registerNumber,
        password,
      });

      const token = response.data.token;
      sessionStorage.setItem('token', token); // Store token in sessionStorage
      console.log('User Logged In', token);
      alert('Login Successful!');

      // Navigate to the home page upon successful login
      navigate('/home'); // Replace '/home' with your actual home page route
    } catch (error) {
      console.error(error.response?.data?.message || 'Login Failed!');
      alert('Login Failed!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">
          Login
        </h2>
        <form onSubmit={onSubmit}>
          {/* Register Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Register Number</label>
            <input
              type="text"
              name="registerNumber"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Register Number"
              value={registerNumber}
              onChange={onChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              Login
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
