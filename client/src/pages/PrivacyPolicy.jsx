// PrivacyPolicy.jsx
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>
        At Innodeeps Chemical, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our website: <strong>innodeepschemical.in</strong>.
      </p>
      <h2 className="font-semibold mt-4">Information We Collect</h2>
      <ul className="list-disc ml-6">
        <li>Your name, address, email, and phone number</li>
        <li>Payment details (processed securely via Razorpay)</li>
        <li>Browsing data (via cookies and analytics tools)</li>
      </ul>
      <h2 className="font-semibold mt-4">How We Use Your Information</h2>
      <ul className="list-disc ml-6">
        <li>To process and deliver your orders of Thinmax products</li>
        <li>To communicate with you for order updates or promotions</li>
        <li>To improve our site and service experience</li>
      </ul>
      <p className="mt-4">
        We do not sell or rent your personal data. All data is securely stored and only shared with third parties involved in order fulfillment (e.g., courier and payment gateway).
      </p>
      <p className="mt-4">
        For queries, email us at <strong>innodeepschemicalsolution@gmail.com</strong>.
      </p>
    </div>
  );
}
