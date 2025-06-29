import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import ThinmaxProductDetails from './pages/ThinmaxProductDetails';
import ThankYou from './pages/ThankYou';
import Product2WatchPage from "./pages/Product2WatchPage"; // Import 
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CancellationRefund from './pages/CancellationRefund';
import ShippingDelivery from './pages/ShippingDelivery';
import TrackOrder from './pages/TrackOrder';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/thinmax-details" element={<ThinmaxProductDetails />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/videos/product2" element={<Product2WatchPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/cancellationrefundpolicy" element={<CancellationRefund />} />
            <Route path="/shippingdelivery" element={<ShippingDelivery />} />
            <Route path="/track-order/:orderId" element={<TrackOrder />} />



          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
