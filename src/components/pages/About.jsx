import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to our domain-selling site! This platform is dedicated to testing and experimenting with domain registration and management through the GoDaddy API. 
        </p>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Please note that this site is solely for testing purposes and is not intended for live domain purchases or commercial use. Our goal is to explore the features and capabilities of domain-related APIs and provide a sandbox environment for learning and development.
        </p>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          If you have any questions or feedback about our testing environment, feel free to reach out. Thank you for visiting!
        </p>
      </div>
    </div>
  );
};

export default About;
