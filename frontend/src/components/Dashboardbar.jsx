import React from "react";
import { Link } from "react-router-dom";

const Dashboardbar = () => {
 

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Left Side - Logo */}
 

      <div className="flex items-center">
       
        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 px-4 py-2 rounded mr-4">
          Signup
        </Link>

      </div>
    </nav>
  );
};

export default Dashboardbar;