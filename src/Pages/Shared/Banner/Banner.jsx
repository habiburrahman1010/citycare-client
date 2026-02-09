import React from "react";

const Banner = () => {
  return (
    <div className="bg-base-200">
      <div className="max-w-7xl mx-auto min-h-[85vh] flex items-center px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Report, Track & Resolve <br />
              <span className="text-blue-600">City Issues with CityCare</span>
            </h1>

            <p className="py-6 text-gray-600 max-w-lg text-lg">
              CityCare helps citizens report problems like road damage, water leaks,
              and electricity faults. Track progress, get updates, and make your city
              safer, cleaner, and smarter with community collaboration.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="btn btn-primary px-8">
                Get Started
              </button>

              <button className="btn btn-outline px-8">
                Explore Issues
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              className="rounded-2xl shadow-2xl w-full object-cover"
              alt="City Care"
            />

            <div className="absolute inset-0 bg-blue-600/10 rounded-2xl"></div>

            <div className="absolute -bottom-6 left-6 bg-base-100 p-4 rounded-xl shadow-lg">
              <p className="font-semibold text-blue-600">🏙 CityCare Platform</p>
              <p className="text-sm text-gray-500">Connecting citizens & authorities</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
