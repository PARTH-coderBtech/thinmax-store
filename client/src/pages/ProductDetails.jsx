import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [] } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) return alert('Razorpay SDK failed to load');

    try {
      const processedCart = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        weight: item.selectedWeight || item.weight || '500gm',
        pricePerUnit: item.pricePerUnit ?? item.price ?? 0,
      }));

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE}/payment/create-order`,
        {
          amount: totalAmount * 100,
          cart: processedCart,
        }
      );

      const { order } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'Indodeeps',
        description: 'Cart Purchase',
        order_id: order.id,
        handler: async (response) => {
          await axios.post(`${import.meta.env.VITE_API_BASE}/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.id,
            cart: processedCart,
            customer: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              pincode: formData.pincode,
            },
          });
          localStorage.removeItem("cart");
          navigate('/thankyou');
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#10B981', // emerald
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong during payment.');
    }

  };

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center text-gray-600">
        No items found in cart. Please go back and add products.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-emerald-50 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-700">
        THINMAX Transparent Waterproofing Solution
      </h1>

      {/* Media Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition">
          <img src="/Product2.jpg" alt="Thinmax" className="object-cover w-full h-full max-h-[400px]" />
        </div>
        <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition">
          <video controls className="object-cover w-full h-full max-h-[400px]">
            <source src="/videos/Howtouse.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Static Product Info */}
      <div className="text-gray-700 text-lg space-y-3 mb-10">
        <p><strong>Brand:</strong> INNODEEPS</p>
        <p><strong>Adhesive Type:</strong> GEL</p>
        <p><strong>Suitable For:</strong> Wall dampness, tiles cracks, concrete cracks, wooden products, rooftop leakages</p>
        <p><strong>Used For:</strong> Wall dampness, rooftop leakages, tiles cracks, any waterproofing</p>
        <p><strong>Temperature Range:</strong> -2°C to 70°C</p>
        <p><strong>Weatherproof:</strong> Yes</p>
        <p><strong>Water Resistant:</strong> Yes</p>
        <div>
          <p className="font-semibold text-emerald-700">Description:</p>
          <p className="text-gray-600">
            Waterproofing solutions are essential for protecting your home or building from water damage.
            Our high-quality transparent waterproofing products create an impermeable barrier that prevents moisture from seeping through walls, floors, and foundations.
            Whether you need to waterproof a basement, bathroom, or exterior surface, our solutions provide long-lasting protection against leaks, mould, and structural deterioration.
            With easy application and superior adhesion, our waterproofing solutions ensure your property remains dry and secure for years to come.
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <h2 className="text-3xl font-bold mb-6 text-emerald-700">Cart Summary</h2>
      {cart.map((item, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {item.name} ({item.selectedWeight || item.weight || '500gm'})
          </h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price per Unit: ₹{item.price}</p>
          <p className="font-bold">Subtotal: ₹{item.price * item.quantity}</p>
        </div>
      ))}

      <p className="text-xl font-bold text-right mt-4 mb-8 text-emerald-700">
        Total Amount: ₹{totalAmount}
      </p>

      {/* Delivery Form */}
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Enter Delivery Details</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <input name="fullName" onChange={handleChange} placeholder="Full Name" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="phone" onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="pincode" onChange={handleChange} placeholder="Pincode" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="address" onChange={handleChange} placeholder="Full Address" className="col-span-2 border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>


      <button
        onClick={handlePayment}
        className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700 transition"
      >
        Proceed to Pay ₹{totalAmount}
      </button>
    </div>
  );
};

export default ProductDetails;
