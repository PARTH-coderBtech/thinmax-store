import React from 'react';
import { Helmet } from 'react-helmet';

export default function CancellationRefund() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Helmet>
        <title>Cancellation & Refund Policy | Innodeeps</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">Cancellation and Refund Policy</h1>
      <p className="text-sm text-gray-500 italic mb-4">
        Last updated: June 28, 2025 | Applicable for orders in India
      </p>

      <p className="mb-6">
        Thank you for choosing to shop at <strong>Innodeeps</strong>. We aim to ensure your satisfaction with every purchase. Please read the policies below to understand the conditions and procedures for returns and refunds.
      </p>

      <h2 className="text-lg font-semibold mt-6">Return Request Period</h2>
      <p>
        Any return request must be submitted within <strong>24 hours</strong> of receiving the product. Requests beyond this window may not be accepted.
      </p>

      <h2 className="text-lg font-semibold mt-6">Damaged Product</h2>
      <p>
        If you receive a damaged product, an <strong>unboxing video</strong> is required to verify the issue. This is mandatory for refund eligibility.
      </p>

      <h2 className="text-lg font-semibold mt-6">Missing Items</h2>
      <p>
        For any missing items, please share an unboxing video clearly showing the received products and report the issue within 24 hours of delivery. Verified cases will be refunded accordingly.
      </p>

      <h2 className="text-lg font-semibold mt-6">Order Cancellation</h2>
      <p>
        Once an order is placed and payment is completed, it <strong>cannot be cancelled</strong> unless there is a valid reason. To request a cancellation, contact us immediately at <a className="text-emerald-600 underline" href="mailto:innodeepschemicalsolution@gmail.com">innodeepschemicalsolution@gmail.com</a>.
      </p>

      <h2 className="text-lg font-semibold mt-6">Undeliverable Shipments</h2>
      <p>
        If a shipment is undeliverable, we will attempt to redeliver using an alternate courier. However, <strong>the product will not be taken back under any circumstances</strong>.
      </p>

      <h2 className="text-lg font-semibold mt-6">Refund Eligibility</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Damaged or defective products (confirmed via unboxing video)</li>
        <li>Missing items we are unable to resend</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6">Product Condition for Refund</h2>
      <p>
        Returned items must be:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>Unused, unwashed, and undamaged</li>
        <li>Returned with original packaging, tags, labels, receipt, and invoice</li>
        <li>Returned only after we receive the product and inspect it</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6">Return Shipping</h2>
      <p>
        The customer bears return shipping charges, except in cases where we shipped a damaged or incorrect product. Use a reliable service with tracking.
      </p>

      <h2 className="text-lg font-semibold mt-6">Rejection / Denial of Parcel</h2>
      <p>
        If a customer refuses delivery:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li><strong>2× shipping charge</strong> will be deducted (forward + return)</li>
        <li><strong>10% of product value</strong> will be deducted as packing charge</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6">Refund Process</h2>
      <p>
        After we receive and inspect the returned product, a refund will be issued to the original payment method within <strong>7 business days</strong>. Refunds are not issued for returns made more than 7 days after delivery.
      </p>

      <h2 className="text-lg font-semibold mt-6">Important Notes</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Refunds are only processed after product verification</li>
        <li>Unboxing video is mandatory in all return cases</li>
        <li>If you believe the product differs from what was shown or expected, report within 24 hours</li>
      </ul>

      <p className="mt-6">
        For assistance, contact our support team at <a className="text-emerald-600 underline" href="mailto:innodeepschemicalsolution@gmail.com">innodeepschemicalsolution@gmail.com</a>
      </p>
    </div>
  );
}
