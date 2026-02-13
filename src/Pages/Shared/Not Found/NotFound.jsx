import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnim from "../../../assets/error.json";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full">
        <Lottie animationData={notFoundAnim} loop={true} />

        <h2 className="text-3xl font-bold text-center mt-4">
          Page Not Found
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Oops! The page you’re looking for doesn’t exist in CityCare.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary px-8"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
