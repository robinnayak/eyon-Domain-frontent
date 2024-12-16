import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");
  const domain_name = queryParams.get("domain_name") || "exampledomain.com";
  const period = queryParams.get("period") || 1;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    domain_name: domain_name,
    email: "",
    period: period,
    first_name: "",
    last_name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    amount: "",
    currency: "",
  });

  const [message, setMessage] = useState(null);

  // Fetch session details from the backend
  const postSessionID = async () => {
    
    try {
      const res = await axios.post(`http://localhost:8000/success/`, {
        session_id: session_id,
      });

      const session = res.data.session;
      const customer = session.customer_details;

      // Update formData with fetched data
      setFormData({
        ...formData,
        email: customer.email,
        first_name: customer.name.split(" ")[0] || "",
        last_name: customer.name.split(" ")[1] || "",
        phone: customer.phone || "",
        address1: customer.address.line1 || "",
        address2: customer.address.line1 || "",
        city: customer.address.city || "",
        state: customer.address.state || "",
        postal_code: customer.address.postal_code || "",
        country: customer.address.country || "",
        amount: (session.amount_total / 100).toFixed(2),
        currency: session.currency.toUpperCase(),
      });

      setMessage(res.data.message);
    } catch (error) {
      console.error("Error fetching session details:", error);
    }
  };

  useEffect(() => {
    if (session_id) {
      postSessionID();
    }
  }, [session_id]);

  // Validate phone number format
  const validatePhone = (phone) => {
    const phoneRegex = /^\+\d{1,4}\.\d{1,14}$/; // E.g., +1.5555555555
    return phoneRegex.test(phone);
  };
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!validatePhone(value)) {
        setErrors({
          ...errors,
          phone: "Phone number must be in format +<country_code>.<number>",
        });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!formData.state.trim()){
      setErrors({ ...errors, state: "State is required" });
      return;
    }
    // Check phone validation before submission
    if (!validatePhone(formData.phone)) {
      setErrors({ ...errors, phone: "Invalid phone number format." });
      return;
    }
    try {
      const processedData = {
        ...formData,
        amount: Math.round(parseFloat(formData.amount) * 100), // Convert dollars to cents
      };
      await axios.post("http://localhost:8000/purchase-domain/", processedData);
      setLoading(false);
      alert("Purchase completed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error sending purchase data:", error);
      alert("An error occurred while processing the purchase.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-green-600 mb-6">
          Payment Successful!
        </h1>

        <p className="text-gray-700 mb-4">
          <strong>Message:</strong>{" "}
          <span className="text-green-800">{message}</span>
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Domain Information
        </h2>
        <p className="text-gray-700 mb-6">
          <strong>Domain Name:</strong> {formData.domain_name}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Review and Update Your Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            {errors.phone && (
              <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-600">Address Line 1</label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Address Line 2</label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Currency</label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Processing..." : "Purchase Domain"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Success;
