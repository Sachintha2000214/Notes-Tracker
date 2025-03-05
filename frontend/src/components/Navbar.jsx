import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // If no token is found, redirect to login
      navigate("/");
    } else {
      try {
        // Decode the token to extract user details
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserDetails(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/"); // Redirect to login on error
      }
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem("token");
    navigate("/"); // Redirect to login page after logout
  };

  if (!userDetails) {
    return null; // Return null if userDetails is not available yet
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>

      {/* Center - Search Bar */}
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded"
      />

      {/* Right Side - User Info & Auth Links */}
      <div className="flex items-center">
        <span className="mr-4">{userDetails.name}</span> {/* Display username */}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
