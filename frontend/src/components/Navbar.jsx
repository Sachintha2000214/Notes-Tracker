//Extract the token from session storage and get the username of the logged user 
//Handle user logout by destroying toke from the session 
//Search accoring the category 

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserDetails(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/"); 
      }
    }
  }, [navigate]);

  const handleLogout = () => {
   
    sessionStorage.removeItem("token");
    navigate("/"); 
  };

  if (!userDetails) {
    return null; 
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
   
      <div className="text-xl font-bold">
        <Link to="/home">Note Tracker</Link>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex items-center">
        <span className="mr-4">{userDetails.name}</span> 

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
