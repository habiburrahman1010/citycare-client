import React from "react";
import { FaUsers, FaCity, FaHandsHelping, FaCheckCircle } from "react-icons/fa";

const CommunityImpact = () => {
  return (
    <div className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Our Impact on the City
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <FaUsers className="text-4xl text-primary mx-auto mb-3" />
            <h3 className="font-bold text-xl">Active Citizens</h3>
            <p className="text-gray-500">10,000+ registered users helping the city.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <FaCity className="text-4xl text-primary mx-auto mb-3" />
            <h3 className="font-bold text-xl">Issues Reported</h3>
            <p className="text-gray-500">Thousands of city problems solved faster.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <FaHandsHelping className="text-4xl text-primary mx-auto mb-3" />
            <h3 className="font-bold text-xl">Staff Connected</h3>
            <p className="text-gray-500">Authorities responding in real time.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <FaCheckCircle className="text-4xl text-primary mx-auto mb-3" />
            <h3 className="font-bold text-xl">Problems Resolved</h3>
            <p className="text-gray-500">Making cities cleaner and safer daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityImpact;
