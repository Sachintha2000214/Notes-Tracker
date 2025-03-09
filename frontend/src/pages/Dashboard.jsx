import React from "react";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image4.jpg')", 
          filter: "brightness(0.8)", 
        }}
      ></div>
      <div className="relative z-10 min-h-screen w-full bg-gray-100 bg-opacity-75">
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-3xl font-bold text-teal-600">Note Tracker</h1>
          <div>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => window.location.href='/login'}>Login</button>
            <button className="bg-teal-700 text-white px-4 py-2 rounded-lg"  onClick={() => window.location.href='/register'}>Sign Up</button>
          </div>
        </div>
        <div className="flex justify-center items-center text-center py-10 px-4">
          <div>
            <h1 className="text-5xl font-bold text-teal-600 mb-6">
              Welcome to Note Tracker!
            </h1>
            <p className="text-2xl text-gray-700 mb-6 font-bold">
              This app helps you organize and manage your notes efficiently.
              Create, update, delete, and search your notes all in one place!
            </p>
            <p className="text-2xl text-gray-700 mb-6 font-bold">
              To start using all the features, please log in or sign up to your account.
            </p>
          </div>
        </div>
        <div className="py-10 px-4">
          <h2 className="text-4xl font-semibold text-center text-teal-600 mb-8">
            Key Features of Note Tracker
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-teal-600 font-bold mb-4">
                Saves Time and Effort
              </h3>
              <p className="text-lg text-gray-700">
                Instead of losing track of paper notes, users can quickly search, edit, or delete
                notes whenever needed. Features like categorizing and searching by keywords help
                save time, making it easier to find important information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-teal-600 font-bold mb-4">Keeps Information Safe</h3>
              <p className="text-lg text-gray-700">
                Unlike physical notebooks that can be lost or damaged, the app keeps notes safe and
                backed up. It also includes security features to protect private information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-teal-600 font-bold mb-4">
                Easy to Use and Customizable
              </h3>
              <p className="text-lg text-gray-700">
                Users can organize their notes in different categories and personalize them based on
                their needs. Whether organizing personal reminders or work-related documents, the
                app adapts to different lifestyles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
