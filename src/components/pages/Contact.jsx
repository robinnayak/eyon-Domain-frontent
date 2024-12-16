import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="max-w-lg w-full bg-white border border-gray-200 rounded-md p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Contact Me</h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-800 font-medium">Robin Nayak</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-gray-800">
              Sanga, Kavrepalanchok, Banepa, Nepal
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800">robinnayak86@gmail.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-800">+977-9815823670</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
