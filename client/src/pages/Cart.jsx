import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (index, type) => {
    const newCart = [...cart];
    if (type === 'increment') {
      newCart[index].quantity += 1;
    } else if (type === 'decrement' && newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    updateCart(newCart);
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to continue checkout.');
      return navigate('/login');
    }

    navigate('/product-details', {
      state: { cart }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-emerald-50 min-h-screen text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(index, 'decrement')}
                  className="px-3 py-1 bg-emerald-200 rounded hover:bg-emerald-300 transition"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, 'increment')}
                  className="px-3 py-1 bg-emerald-200 rounded hover:bg-emerald-300 transition"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-xl font-bold text-emerald-800">
              Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
            >
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
