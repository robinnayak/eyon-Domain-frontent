import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Purchase = () => {
  const location = useLocation();
  const { domain } = location.state;

  console.log("purchase", domain);
  const [formData, setFormData] = useState({
    domain_name: domain.domain || "",
    email: "",
    email_verified: false,
    period: domain.period || 1,
    first_name: "",
    last_name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    fax: "+1.2125551234",
    amount: (domain.price / 1_000_000).toFixed(2) || 10,
    currency: domain.currency || "USD",
    payment_method: "card",
  });

  useEffect(() => {
    const updatedPrice =
      (domain.price / 1_000_000).toFixed(2) * formData.period;
    setFormData({
      ...formData,
      amount: updatedPrice,
    });
  }, [formData.period, domain.price]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/purchase-domain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Domain Purchase Successful: ${JSON.stringify(data)}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">Purchase Domain</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        <div className="mb-4">
          <label
            htmlFor="domain_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Domain Name
          </label>
          <input
            type="text"
            id="domain_name"
            name="domain_name"
            value={formData.domain_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="period"
            className="block text-gray-700 font-bold mb-2"
          >
            Period (Years)
          </label>
          <input
            type="number"
            id="period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address1"
            className="block text-gray-700 font-bold mb-2"
          >
            Address 1
          </label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="postal_code"
            className="block text-gray-700 font-bold mb-2"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-gray-700 font-bold mb-2"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="currency"
            className="block text-gray-700 font-bold mb-2"
          >
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            disabled
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="payment_method"
            className="block text-gray-700 font-bold mb-2"
          >
            Payment Method
          </label>
          <select
            id="payment_method"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="card">Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="email_verified"
            name="email_verified"
            checked={formData.email_verified}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="email_verified" className="text-gray-700 font-bold">
            Email Verified
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Purchase;
