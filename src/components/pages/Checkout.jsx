import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { baseURL, checkout } from "../endpoints";

const Checkout = () => {
  const location = useLocation();
  const { domain } = location.state;
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);

  // State for editable fields
  const [period, setPeriod] = useState(domain.period); // Default to domain's initial period
  const [email, setEmail] = useState("example@email.com");
  const [price, setPrice] = useState(domain.price); // Default price

  // Update price dynamically when the period changes
  const handlePeriodChange = (e) => {
    const newPeriod = Number(e.target.value);
    if (!isNaN(newPeriod) && newPeriod > 0) {
      setPeriod(newPeriod);
      setPrice(domain.price * newPeriod); // Update price based on period
    }
  };

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Post to Stripe Payment
  const postStripePayment = async () => {
    setChecking(true);
    try {
      const res = await axios.post(`http://localhost:8000/checkout-session/`,{
        name: domain.domain,
        price: (price / 1_000_000).toFixed(2), // Use dynamically updated price
        period: period, // Description reflects the period
        email: email, // Use the entered email
      });
      console.log(res);
      if (res.status === 200) {
        setChecking(false);
        const sessionUrl = res.data.session;
        if (sessionUrl) {
          window.location.href = sessionUrl;
      }else{
        setError("Error in creating session url");
      }
    }
    } catch (err) {
      console.error("error message",err.response.data.error);
        setError(err.response.data.error);
        setChecking(false);
    }
    finally{
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-200 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Domain Checkout
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Domain Name:</span>
            <span className="text-gray-900">{domain.domain}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Price:</span>
            <span className="text-gray-900">
              ${(price / 1_000_000).toFixed(2)} {domain.currency}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Available:</span>
            <span
              className={`font-semibold ${
                domain.available ? "text-green-500" : "text-red-500"
              }`}
            >
              {domain.available ? "Yes" : "No"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="period" className="font-semibold text-gray-700">
              Period (years):
            </label>
            <input
              id="period"
              type="number"
              min="1"
              value={period}
              onChange={handlePeriodChange}
              className="w-16 border rounded-md text-center"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-2/3 border rounded-md px-2 py-1"
            />
          </div>
        </div>

        <button
          onClick={postStripePayment}
          className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        disabled={checking}
        >
            {checking ? "Processing..." : "Checkout"}
        </button>
        {error && <p className="text-red-500 text-center p-2">{error}</p>}
                
      </div>
    </div>
  );
};

export default Checkout;
