import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    email: "",
    password: "",
  });

  const { name, registerNumber, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      alert("Registration Successful!");
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Register Number"
              value={registerNumber}
              onChange={onChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Email"
              value={email}
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
