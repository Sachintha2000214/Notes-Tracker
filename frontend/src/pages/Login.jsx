//Vaildate user inputs and store the generated token to session storage 


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: '',
  });

  const { registerNumber, password } = formData;
  const navigate = useNavigate(); 

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
      sessionStorage.setItem('token', token); 
      console.log('User Logged In', token);
      alert('Login Successful!');
      navigate('/home'); 
    } catch (error) {
      console.error(error.response?.data?.message || 'Login Failed!');
      alert('Login Failed!');
    }
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center" 
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/image4.jpg)', 
          filter: 'brightness(0.5)', 
        }}
      ></div>
      <div className="relative z-10 w-[400px] p-10 bg-blue-400 bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-semibold mb-8 text-center text-white">
          Login
        </h2>
        <form onSubmit={onSubmit}>
      
          <div className="mb-8">
            <label className="block text-white text-lg font-medium mb-2">
              Register Number
            </label>
            <input
              type="text"
              name="registerNumber"
              className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter Register Number"
              value={registerNumber}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-white text-lg font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter Password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-8">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-200 transition duration-300 text-lg"
            >
              Login
            </button>
          </div>
          <p className="text-center text-lg text-black-300">
            Don't have an account?{' '}
            <a href="/register" className="text-bla-400 hover:underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
