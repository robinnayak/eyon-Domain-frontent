import React, { useState } from "react";
import axios from "axios";
import { baseURL, listDomains } from "../endpoints.js";
import AvailableDomains from "../compo/AvailableDomains.jsx";

const Home = () => {
  const [domainName, setDomainName] = useState(""); // State for input
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [availableDomains, setAvailableDomains] = useState([]); // State for API response
  const [error, setError] = useState(null); // State for error handling
  const [selectedExtensions, setSelectedExtensions] = useState([]); // State for selected extensions

  const extensions = [
    ".com", ".in", ".org", ".net", ".info", ".co", ".io",
    ".biz", ".us", ".uk", ".ca", ".au", ".eu", ".asia", ".de"
  ];

  const url = `${baseURL}${listDomains}`;

  const handleExtensionClick = (extension) => {
    setSelectedExtensions((prev) => {
      if (prev.includes(extension)) {
        return prev.filter((ext) => ext !== extension); // Remove if already selected
      } else {
        return [...prev, extension]; // Add if not selected
      }
    });
  };

  const handleClearExtensions = () => {
    setSelectedExtensions([]); // Clear all selected extensions
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setAvailableDomains([]);
    setIsLoading(true); // Show loader

    try {
      const response = await axios.post(url, {
        domain_name: domainName,
        extensions: selectedExtensions,
      }); // POST request
      setAvailableDomains(response.data.available_domains || []); // Update domains list
    } catch (err) {
      setError("An error occurred while fetching domain data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-center text-3xl font-bold mb-2">Buy GoDaddy Domain API</h1>
      <p className="text-center text-gray-600 mb-5">
        This project demonstrates how to check domain availability using the GoDaddy API.
      </p>

      <div className="flex justify-center items-center">
        <form
          className="p-5 w-full max-w-md bg-white shadow-lg rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="domain-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Domain Name
            </label>
            <input
              type="text"
              id="domain-name"
              className="form-control border-2 w-full p-2 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter domain name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Extensions</h3>
            <div className="grid grid-cols-3 gap-2">
              {extensions.map((ext) => (
                <div
                  key={ext}
                  onClick={() => handleExtensionClick(ext)}
                  className={`cursor-pointer px-3 py-2 rounded-md text-center border ${
                    selectedExtensions.includes(ext)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {ext}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-600 transition"
              disabled={isLoading}
            >
            {isLoading ? "Checking..." : "Submit"}
              
            </button>
          </div>

          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition"
            onClick={handleClearExtensions}
            
          >
            Clear Extensions
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-5 text-center text-red-500 font-semibold">{error}</div>
      )}

      <AvailableDomains availableDomains={availableDomains} />
    </div>
  );
};

export default Home;
