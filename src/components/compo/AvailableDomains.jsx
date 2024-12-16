import React from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableDomains = ({ availableDomains }) => {
  // console.log(availableDomains);
  const navigate = useNavigate();

  const handleBuy = (domain) => {
    navigate('/checkout', { state: { domain } });
  }
  return (
    <div>
      {availableDomains.length > 0 && (
        <div className="mt-10">
          <h2 className="text-center text-2xl font-bold mb-5 text-yellow-600">Available Domains</h2>
          <table className="table-auto w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-yellow-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Index</th>
                <th className="px-4 py-2 text-left">Domain Name</th>
                <th className="px-4 py-2 text-left">Period</th>
                <th className="px-4 py-2 text-left">Available</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Currency</th>
                <th className="px-4 py-2 text-left">Purchase</th>
              </tr>
            </thead>
            <tbody>
              {availableDomains.map((domain, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-800">{index + 1}</td>
                  <td className="px-4 py-2 text-gray-800">{domain.domain}</td>
                  <td className="px-4 py-2 text-gray-800">{domain.period} year</td>
                  <td className="px-4 py-2 text-gray-800">{domain.available ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-yellow-600">${(domain.price / 1_000_000).toFixed(2)}</td>
                  <td className="px-4 py-2 text-gray-800">{domain.currency}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition"
                      onClick={() => handleBuy(domain)}
                    >
                      Checkout
                    </button>
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

export default AvailableDomains;
