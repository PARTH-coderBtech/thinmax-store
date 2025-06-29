// ShippingDelivery.jsx
import React from 'react';

export default function ShippingDelivery() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shipping and Delivery Policy</h1>
      <ul className="list-disc ml-6">
        <li>We deliver Thinmax Waterproofing products across India.</li>
        <li>Orders are shipped within <strong>1-2 working days</strong> after successful payment.</li>
        <li>Delivery time typically ranges from <strong>3–7 working days</strong> based on your location.</li>
        <li>Shipping charges are displayed during checkout.</li>
        <li>Once shipped, tracking details will be shared via SMS or email.</li>
      </ul>
      <p className="mt-4">
        In case of any delivery issue, please reach out at <strong>innodeepschemicalsolution@gmail.com</strong>.
      </p>
    </div>
  );
}
