import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
