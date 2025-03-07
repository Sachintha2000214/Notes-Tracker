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

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate registerNumber field
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-96 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">
          Signup
        </h2>
        <form onSubmit={onSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Username"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          {/* Register Number Input */}
          <div className="mb-4">
        <label className="block text-gray-700">Register Number</label>
        <input
          type="text"
          name="registerNumber"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 ${
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

          {/* Email Input */}
          <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 ${
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

          {/* Password Input */}
          <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 ${
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

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              Signup
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center">
            Already Have an Account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
