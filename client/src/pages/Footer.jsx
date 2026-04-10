import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

// Main component, adhering to the single-file mandate for React apps.
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubscribe = () => {
    // This would typically send the email to a backend service.
    // For this demo, we'll just log a message.
    console.log("Subscription request sent!");
    setShowConfirmation(true);
  };

  return (
    <div className="bg-gray-100 font-sans">
      <footer className="bg-[#8B0000] text-gray-200 py-16 px-6 sm:px-12 rounded-t-2xl">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-red-700 pb-12">
            {/* Brand Identity */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              {/* Yahan aap apna brand logo daal sakte hain. */}
              {/* Yahan aap apne brand ka logo daal sakte hain. Abhi, ek demo image di gayi hai. */}
              <img
                src="/src/assets/logo.png"
                alt="Allredz Spices Logo"
                className="mb-8 rounded-lg shadow-lg h-12 w-auto object-contain"
                onError={(e) => { e.target.style.display='none'; }}
              />
              <p className="text-sm leading-relaxed text-gray-300">
                Premium quality spices to bring exceptional flavor and aroma to
                your dishes. Your taste, our passion.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-red-700"
                >
                  <Facebook size={22} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-red-700"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-red-700"
                >
                  <Twitter size={22} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Our Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Blog & Recipes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Help & Support */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Help & Support
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Customer Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Newsletter
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Subscribe for the latest offers & updates!
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="w-full bg-red-600 hover:bg-red-500 transition-colors duration-200 text-white font-semibold py-3 px-6 rounded-md shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                Our Location
              </h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <MapPin size={18} className="mr-3 text-red-400" />
                  <span className="text-gray-300">
                    123 Spices Lane, Flavorville, USA
                  </span>
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-3 text-red-400" />
                  <a
                    href="tel:+15551234567"
                    className="hover:text-white transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail size={18} className="mr-3 text-red-400" />
                  <a
                    href="mailto:info@allredz.com"
                    className="hover:text-white transition-colors"
                  >
                    info@allredz.com
                  </a>
                </p>
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                Secure Payments
              </h3>
              <div className="flex space-x-3 items-center">
                <CreditCard size={32} className="text-white" />
                <ShieldCheck size={32} className="text-white" />
                {/* Asli rangon wale demo logos */}
                <span className="px-3 py-1 bg-[#1a187a] text-white text-xs font-bold rounded-md">VISA</span>
                <span className="px-3 py-1 bg-[#eb001b] text-white text-xs font-bold rounded-md">MC</span>
              </div>
            </div>

            {/* Legal & Policies */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-6 text-center text-gray-400 text-sm border-t border-red-700 mt-8">
            © {currentYear} Allredz Spices. All rights reserved.
          </div>
        </div>
      </footer>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
            <h4 className="2xl font-bold mb-4 text-gray-900">
              Subscription Confirmed!
            </h4>
            <p className="text-gray-700 mb-6">
              Thank you for subscribing! We'll send you our latest offers and
              updates.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
