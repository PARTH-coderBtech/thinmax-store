// src/pages/ThankYou.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-emerald-50">
      <h1 className="text-4xl font-bold text-emerald-700 mb-4">Thank You for Your Purchase!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your payment was successful. We’ll notify you when your order ships.
      </p>
      <Link
        to="/"
        className="bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ThankYou;
