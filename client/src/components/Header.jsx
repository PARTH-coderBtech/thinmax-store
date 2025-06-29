
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    let user = null;

    if (userData && userData !== "undefined") {
      try {
        user = JSON.parse(userData);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }

    if (user) {
      setIsLoggedIn(true);
      if (user.email === 'parthagrawal2006asr@gmail.com') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      alert('Please login first!');
    } else {
      navigate(path);
    }
  };

  return (
    <header className="bg-emerald-600 shadow-md sticky top-0 z-50 min-h-[90px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center w-full relative animate-fadeIn text-white">

        {/* Left Nav */}
        <nav className="space-x-4 font-medium flex items-center text-sm md:text-base">
          <Link to="/" className="hover:text-emerald-200 transition-all duration-300">Home</Link>
          <Link to="/about" className="hover:text-emerald-200 transition-all duration-300">About</Link>
          <Link to="/contact" className="hover:text-emerald-200 transition-all duration-300">Contact Us</Link>
          <button
            onClick={() => handleProtectedNavigation("/cart")}
            className="hover:text-emerald-200 transition-all duration-300"
          >
            Cart
          </button>
        </nav>


        {/* Right Nav */}
        <nav className="space-x-4 font-medium flex items-center text-sm md:text-base">
          {isAdmin && (
            <Link to="/admin" className="hover:text-emerald-200 transition-all duration-300">Admin</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-emerald-200 transition-all duration-300">Login</Link>
              <Link to="/signup" className="hover:text-emerald-200 transition-all duration-300">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
