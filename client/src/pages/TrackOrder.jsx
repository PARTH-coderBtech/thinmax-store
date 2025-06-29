// src/pages/TrackOrder.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("❌ Error fetching order:", err);
        setError("Order not found or server error.");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!order) return <div className="p-4">Loading...</div>;

  const customer = order.customer || {
    name: order.name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    pincode: order.pincode,
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow mt-10 bg-white">
      <h2 className="text-xl font-bold text-emerald-600 mb-4">🧾 Order Details</h2>

      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Status:</strong> {order.paymentStatus}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      {customer && (
        <div className="mt-4">
          <h4 className="font-semibold">Customer Info:</h4>
          <p>{customer.name}</p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <p>{customer.address}, {customer.pincode}</p>
        </div>
      )}

      {Array.isArray(order.cart) && order.cart.length > 0 ? (
        <div className="mt-4">
          <h4 className="font-semibold">Items:</h4>
          <ul className="list-disc list-inside">
            {order.cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.weight} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4">
          <h4 className="font-semibold">Item:</h4>
          <p>Thinmax Roof Sealent - {order.weight} x {order.quantity}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
