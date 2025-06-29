import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ThinmaxProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity } = location.state;

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
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) return alert("Razorpay SDK failed to load.");

    try {
      const orderResponse = await axios.post(`${import.meta.env.VITE_API_BASE}/payment/create-order`, {
        amount: product.price * quantity * 100,
        productId: product._id,
        productName: product.name,
      });

      const { order } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Indodeeps",
        description: product.name,
        order_id: order.id,
        handler: async (response) => {
          console.log("Verify endpoint:", `${import.meta.env.VITE_API_BASE}/payment/verify`);
          await axios.post(`${import.meta.env.VITE_API_BASE}/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.id,
            productId: product._id,
            quantity,
            weight: product.selectedWeight,
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            pincode: formData.pincode,
          },
        
        
        );
          navigate('/thankyou');
         
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#10b981" }, // Emerald
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Payment error occurred.");
    }
     
  };

  return (
    <div className="bg-emerald-50 max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-emerald-800">
        THINMAX Transparent Waterproofing Solution
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
          <img src="/Product.jpg" alt="Thinmax" className="object-cover w-full h-full max-h-[400px]" />
        </div>
        <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
          <video
            controls
            className="w-full h-full object-cover max-h-[400px]"
          >
            <source src="/videos/Howtouse.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="space-y-4 text-amber-900 text-lg">
        <p><strong>Brand:</strong> INNODEEPS</p>
        <p><strong>Weight:</strong> {product.selectedWeight || '500gm'}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Adhesive Type:</strong> GEL</p>
        <p><strong>Suitable For:</strong> Wall dampness, tiles cracks, concrete cracks, wooden products, roof top leakages</p>
        <p><strong>Used For:</strong> Wall dampness, rooftop leakages, tiles cracks, any waterproofing</p>
        <p><strong>Temperature Range:</strong> -2°C to 70°C</p>
        <p><strong>Weatherproof:</strong> Yes</p>
        <p><strong>Water Resistant:</strong> Yes</p>

        <div className="mt-4">
          <p className="font-semibold text-lg">Description:</p>
          <p className="text-amber-700">
            Waterproofing solutions are essential for protecting your home or building from water damage.
            Our high-quality transparent waterproofing products create an impermeable barrier that prevents
            moisture from seeping through walls, floors, and foundations. Whether you need to waterproof a
            basement, bathroom, or exterior surface, our solutions provide long-lasting protection against leaks,
            mould, and structural deterioration. With easy application and superior adhesion, our waterproofing
            solutions ensure your property remains dry and secure for years to come.
          </p>
        </div>
      </div>

      <p className="text-2xl font-bold mt-10 text-emerald-700">
        Total: ₹{product.price * quantity}
      </p>

      <div className="mt-8 bg-emerald-100 p-6 rounded-xl shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Enter Delivery Details:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="fullName" onChange={handleChange} placeholder="Full Name" className="border p-3 rounded w-full" />
          <input name="email" onChange={handleChange} placeholder="Email" className="border p-3 rounded w-full" />
          <input name="phone" onChange={handleChange} placeholder="Phone Number" className="border p-3 rounded w-full" />
          <input name="pincode" onChange={handleChange} placeholder="Pincode" className="border p-3 rounded w-full" />
          <input name="address" onChange={handleChange} placeholder="Full Address" className="col-span-2 border p-3 rounded w-full" />
        </div>
        <button
          onClick={handlePayment}
          className="mt-6 bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition duration-300"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default ThinmaxProductDetails;
