import React from "react";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Domain Purchase Cancelled
          </h1>
          <p className="text-gray-700 mb-6">
            Your domain purchase process has been cancelled. If you want to
            retry or explore other options, feel free to navigate back to our
            services.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.href = "/"}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Go to Home
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
