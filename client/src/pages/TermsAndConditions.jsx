// TermsAndConditions.jsx
import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p>
        These terms and conditions govern your use of our website and the purchase of our products. By placing an order on <strong>innodeepschemical.in</strong>, you agree to these terms.
      </p>
      <ul className="list-disc ml-6 mt-4">
        <li>All Thinmax products listed are for waterproofing use only.</li>
        <li>Prices listed include applicable taxes unless stated otherwise.</li>
        <li>Orders are processed only after successful payment confirmation.</li>
        <li>Product usage is the responsibility of the customer. Instructions must be followed.</li>
        <li>We reserve the right to update or modify terms without prior notice.</li>
      </ul>
      <p className="mt-4">For assistance, contact us through our Contact Us page.</p>
    </div>
  );
}
