import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PurchasedCustomerDetails = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [customerDetails, setCustomerDetails] = useState([]);

  const getPurchaseCustomerDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/purchase-customer-details/${sessionId}`
      );
      setCustomerDetails(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (sessionId) {
      getPurchaseCustomerDetail();
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchased Customer Details</h1>
      {customerDetails.length === 0 ? (
        <p className="text-gray-500">No details available for this session.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {detail.order_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {detail.first_name} {detail.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {detail.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {detail.country}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(detail.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchasedCustomerDetails;
