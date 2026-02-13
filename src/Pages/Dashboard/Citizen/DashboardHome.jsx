import React from "react";

const DashboardHome = () => {
 
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center md:text-left text-blue-600">
        CityCare Dashboard
      </h2>

     

     
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Welcome to CityCare
        </h3>
        <p className="text-gray-500">
          Track, manage, and resolve city issues efficiently. Monitor payments,
          submissions, and stay up to date with the latest activities in your
          city community.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
