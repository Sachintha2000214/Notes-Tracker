//Validate the user inputs and user registation

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    email: "",
    password: "",
  });

  const { name, registerNumber, email, password } = formData;

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    registerNumber: "",
  });

  const registerNumberPattern = /^EG\/\d{4}\/\d{4}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "registerNumber") {
      if (!registerNumberPattern.test(value)) {
        setErrors({ ...errors, registerNumber: "Register Number must be in the format EG/YYYY/XXXX" });
      } else {
        setErrors({ ...errors, registerNumber: "" });
      }
    }

       if (name === "email") {
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, email: "Please enter a valid email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "password") {
      if (!passwordPattern.test(value)) {
        setErrors({
          ...errors,
          password:
            "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Sending:", formData); 
    try {
      const response = await axios.post("http://localhost:5555/user/register", {
        name,
        registerNumber,
        email,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      console.log("User Registered", token);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Registration Failed!");
      alert("Registration Failed!");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image4.jpg')", 
          filter: "brightness(0.3)", 
        }}
      ></div>
      <div className="relative z-10 w-[400px] p-10 bg-blue-400 bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-semibold mb-8 text-center text-white">Signup</h2>
        <form onSubmit={onSubmit}>

          <div className="mb-8">
            <label className="block text-white text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter Name"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-white text-lg font-medium mb-2">Register Number</label>
            <input
              type="text"
              name="registerNumber"
              className={`w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                errors.registerNumber ? "border-red-500" : ""
              }`}
              placeholder="Enter Register Number (EG/YYYY/XXXX)"
              value={registerNumber}
              onChange={onChange}
              required
            />
            {errors.registerNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.registerNumber}</p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-white text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter Email"
              value={email}
              onChange={onChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-8">
            <label className="block text-white text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter Password"
              value={password}
              onChange={onChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-8">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 text-lg"
            >
              Signup
            </button>
          </div>
          <p className="text-center text-lg text-black-300">
            Already Have an Account?{" "}
            <a href="/login" className="text-black-400 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;