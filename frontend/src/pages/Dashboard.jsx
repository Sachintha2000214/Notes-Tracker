import React from "react";
import Dashboardbar from "../components/Dashboardbar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image with CSS */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image4.jpg')", // Ensure image is in public folder
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full bg-gray-100 bg-opacity-75">
        {/* Navbar with default search and logout options */}
        <Dashboardbar />

        {/* Description about the app */}
        <div className="flex justify-center items-center text-center py-10 px-4">
          <div>
            <h1 className="text-5xl font-bold text-teal-600 mb-6">
              Welcome to Your Personal NoteApp!
            </h1>
            <p className="text-2xl text-gray-700 mb-6 font-bold">
              This app helps you organize and manage your notes efficiently.
              Create, edit, and track your tasks in a user-friendly interface.
              Stay on top of your work and keep your thoughts organized.
            </p>
            <p className="text-2xl text-gray-700 mb-6 font-bold">
              To start using all the features, please log in or sign up to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;