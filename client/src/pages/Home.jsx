import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import WhatsAppIcon from '../components/WhatsAppIcon';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeMedia, setActiveMedia] = useState(0);
  const navigate = useNavigate();

  const mediaSources = [
    { type: 'image', src: '/Product.jpg' },
    { type: 'image', src: '/Product5.jpg' },
    { type: 'image', src: '/Product6.jpg' },
    { type: 'image', src: '/Product7.jpg' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let interval;
    if (mediaSources[activeMedia].type === 'image') {
      interval = setInterval(() => {
        setActiveMedia((prev) => (prev + 1) % mediaSources.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeMedia]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/products/all`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (product, quantity = 1) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      alert("Please log in to add items to cart.");
      return navigate('/login');
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) =>
        item._id === product._id &&
        item.selectedWeight === product.selectedWeight
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("user", JSON.stringify({ ...user, token }));

    alert("Added to cart!");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/cart/add`,
        {
          productId: product._id,
          quantity,
          selectedWeight: product.selectedWeight,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Backend cart update failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative">
      {/* Logo Centered at Top */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-50 transition-transform duration-700 ease-in-out hover:scale-105">
        <Link to="/">
          <img
            src={"/logo1.png"}
            alt="ThinMax Logo"
            className="h-[90px] w-[100px]"
          />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 pt-[120px] bg-emerald-50 min-h-screen text-gray-800">
        {/* Media Switcher */}
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden shadow">
            {mediaSources[activeMedia].type === 'image' ? (
              <img src={mediaSources[activeMedia].src} className="w-full h-[500px] object-contain" />
            ) : (
              <video
                src={mediaSources[activeMedia].src}
                className="w-full h-full object-contain"
                autoPlay
                muted
                controls
                onEnded={() => {
                  setActiveMedia((prev) => (prev + 1) % mediaSources.length);
                }}
              />
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {mediaSources.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveMedia(index)}
                className="cursor-pointer w-20 h-20 border rounded overflow-hidden"
              >
                {item.type === 'image' ? (
                  <img src={item.src} className="w-full h-full object-cover" />
                ) : (
                  <video src={item.src} className="w-full h-full object-cover" muted />
                )}
              </div>
            ))}
          </div>
        </div>
        {products.length > 0 && (
          <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl h-[600] shadow-md p-6 m-10">
            <ProductCard product={products[0]} navigate={navigate} handleAddToCart={handleAddToCart} />
          </div>
        )}
        {/* Shared Info Section */}
        <div className="bg-emerald-100 p-6 rounded-lg text-sm text-gray-700 mb-8">
          <p><span className="font-semibold">Title:</span> THINMAX transparent waterproofing solution</p>
          <p><span className="font-semibold">Brand:</span> INNODEEPS</p>
          <p><span className="font-semibold">Specification:</span> Adhesive Type - GEL</p>
          <p><span className="font-semibold">Suitable For:</span> Wall dampness, tiles cracks, concrete cracks, wooden products, roof top leakages</p>
          <p><span className="font-semibold">Used For:</span> Wall dampness, rooftop leakages, tiles cracks, water leakages, any waterproofing</p>
          <p><span className="font-semibold">Temperature Range:</span> -2°C to 70°C</p>
          <p><span className="font-semibold">Additional Features:</span> Weatherproof - Yes, Water Resistant - Yes</p>
          <div className="mt-2">
            <p className="font-semibold">Description:</p>
            <p>
              Waterproofing solutions are essential for protecting your home or building from water damage.
              Our high-quality transparent waterproofing products create an impermeable barrier that prevents
              moisture from seeping through walls, floors, and foundations. Whether you need to waterproof a
              basement, bathroom, or exterior surface, our solutions provide long-lasting protection against
              leaks, mould, and structural deterioration. With easy application and superior adhesion, our
              waterproofing solutions ensure your property remains dry and secure for years to come.
            </p>
          </div>
        </div>
        {/* Additional Full-Width Media Section */}
        <div className="max-w-6xl mx-auto mt-16 space-y-6">
          <h3 className="text-xl font-semibold text-emerald-800 mb-2 text-center">See It in Action</h3>

          <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden shadow">
            <img src="/Product2.jpg" alt="ThinMax Application" className="w-full h-full object-contain" />
          </div>

          <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden shadow">
            <video
              src="/videos/Product2video.mp4"
              className="w-full h-full object-contain"
              controls
              muted
            />
          </div>

          <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden shadow">
            <video
              src="/videos/Howtouse.mp4"
              className="w-full h-full object-contain"
              controls
              muted
            />
          </div>
        </div>



        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">What Our Customers Say</h3>
          <div className="space-y-3">
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700">
              “This product sealed my roof leakage in one go. Highly recommended!” – Ravi S.
            </blockquote>
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700">
              “Easy to apply and very effective. My tiles look brand new again.” – Sneha T.
            </blockquote>
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700">
              “Affordable and reliable waterproofing solution. I’ve used it twice!” – Arjun M.
            </blockquote>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">Frequently Asked Questions</h3>
          <ul className="space-y-4">
            <li>
              <strong>Q: How long does the waterproofing last?</strong>
              <p>A: It provides long-lasting protection up to 5 years under normal conditions.</p>
            </li>
            <li>
              <strong>Q: Can this be used on wooden surfaces?</strong>
              <p>A: Yes, THINMAX is safe and effective for wooden surfaces as well.</p>
            </li>
            <li>
              <strong>Q: Is this product non-toxic?</strong>
              <p>A: Absolutely. It's formulated to be safe for home and outdoor use.</p>
            </li>
            <li>
              <strong>Q: Do I need professional help to apply it?</strong>
              <p>A: Not necessarily. It's DIY-friendly and comes with instructions.</p>
            </li>
          </ul>
        </div>

        <WhatsAppIcon />
      </div>
    </div>
  );
};

const ProductCard = ({ product, navigate, handleAddToCart }) => {
  const [selectedWeight, setSelectedWeight] = useState('500gm');
  const [quantity, setQuantity] = useState(1);

  const adjustedPrice = selectedWeight === '1kg' ? product.price * 2 - 98 : product.price;

  const handleBuy = () => {
    const updatedProduct = {
      ...product,
      price: adjustedPrice,
      selectedWeight,
    };
    navigate('/thinmax-details', {
      state: { product: updatedProduct, quantity },
    });
  };

  const handleCart = () => {
    const updatedProduct = {
      ...product,
      price: adjustedPrice,
      selectedWeight,
    };
    handleAddToCart(updatedProduct, quantity);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>

      <div className="flex gap-4 mb-4">
        {['500gm', '1kg'].map((weight) => (
          <button
            key={weight}
            onClick={() => setSelectedWeight(weight)}
            className={`px-4 py-2 rounded-full border font-medium ${selectedWeight === weight ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700'}`}
          >
            {weight}
          </button>
        ))}
      </div>

      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.396 2.006 10.604 2.006 10.951 2.927l1.286 3.733a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.157 2.294a1 1 0 00-.364 1.118l1.286 3.733c.347.921-.755 1.688-1.538 1.118L10 14.347l-3.157 2.294c-.783.57-1.885-.197-1.538-1.118l1.286-3.733a1 1 0 00-.364-1.118L3.07 9.16c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.286-3.733z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">4.9 (232 reviews)</span>
      </div>

      <p className="text-lg font-bold text-emerald-900 mb-4">₹{adjustedPrice}</p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full sm:w-24 border rounded p-2"
        />
        <button
          onClick={handleBuy}
          className="w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition duration-300"
        >
          Buy Now
        </button>
        <button
          onClick={handleCart}
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Home;
