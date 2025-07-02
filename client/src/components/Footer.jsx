import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-emerald-600 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p>Copyright © 2025 innodeepschemical.in - All Rights Reserved.</p>

        {/* ✅ Legal Page Links */}
        {/* <div className="flex flex-wrap justify-center gap-4 text-sm text-emerald-100">
          <Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link>
          <Link to="/termsandconditions" className="hover:underline">Terms & Conditions</Link>
          <Link to="/cancellationrefundpolicy" className="hover:underline">Cancellation & Refund</Link>
          <Link to="/shippingdelivery" className="hover:underline">Shipping & Delivery</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div> */}

        <p className="text-sm text-emerald-100">Developed by Parth Agrawal</p>
      </div>
    </footer>
  );
};

export default Footer;
