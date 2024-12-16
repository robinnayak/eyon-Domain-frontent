import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseDomainDetail = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getPurchaseDomainDetail = async () => {
    try {
      const res = await axios.get("http://localhost:8000/checkout-session-details/");
      setSessions(res.data.checkout_sessions);
    } catch (err) {
      setError("Failed to load session details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPurchaseDomainDetail();
  }, []);


  const handleNavigate = (sessionId) => {
    navigate(`/purchase-customer-detail?session_id=${sessionId}`);
  };
  const generate_csv =  async () => {
    try {
      const res = await axios.get("http://localhost:8000/export-checkout-sessions/");
      
      navigate(`/csv-generator`,{state: {csv: res.data}});
    }
    catch (err) {
      console.error(err);
    }
  }
  if (loading) return <div className="text-center text-lg font-bold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Purchase Domain Details</h1>
      <button onClick={generate_csv} className="border-2 p-2 rounded-xl mb-2 bg-yellow-400 text-white hover:bg-green-500">Generate Csv</button>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.session_id}
            className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300"
          >
            <div className="text-lg font-semibold">Domain: {session.domain_name}</div>
            <div className="text-sm text-gray-600">Email: {session.email}</div>
            <div className="text-sm text-gray-600">Period: {session.period} year(s)</div>
            <div className="text-sm text-gray-600">Price: {session.price} {session.currency.toUpperCase()}</div>
            <div className="text-sm text-gray-600">Created At: {new Date(session.created_at).toLocaleString()}</div>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
              onClick={() => handleNavigate(session.session_id)}
            >
              View purchase Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseDomainDetail;
