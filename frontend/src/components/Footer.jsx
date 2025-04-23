import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  const navigate = useNavigate();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Navigate and scroll to top
  const handleLinkClick = (path) => {
    scrollToTop();
    navigate(path);
  };

  return (
    <footer className="mt-40 mb-10 px-6 sm:px-12">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between text-sm">

        {/* Left Column: Logo and Description */}
        <div className="mb-8 sm:mb-0 sm:w-1/3 sm:ml-20">
          <img src={assets.logo} alt="Logo" className="w-32 mb-5 mx-auto sm:mx-0" />
          <p className="text-gray-600 max-w-xs md:max-w-md mx-auto sm:mx-0">
            Luxe Castle, established in 2018, embodies a harmonious blend of comfort and sophistication. Inspired by the grace of a princess in her castle, we offer a semi-formal ambiance with soft, elegant, and polished touches.
          </p>
        </div>

        {/* Middle Column: Company Links + Get In Touch */}
        <div className="flex flex-col sm:flex-row sm:w-2/3 justify-center sm:justify-between gap-8 sm:gap-16 sm:ml-20">
          {/* Company Links */}
          <div className="flex flex-col sm:w-1/2">
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Company</h3>
            <ul className="space-y-2 text-gray-600 text-center sm:text-left">
              <li>
                {/* Home link directly connected to home page */}
                <button
                  onClick={() => handleLinkClick("/")}
                  className="hover:text-black"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/about")}
                  className="hover:text-black"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/collection")}
                  className="hover:text-black"
                >
                  Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/contact")}
                  className="hover:text-black"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="flex flex-col sm:w-1/2">
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Get In Touch</h3>
            <ul className="space-y-2 text-gray-600 text-center sm:text-left">
              <li>+60-945-7783</li>
              <li>contact@LuxeCastleHere.com</li>
            </ul>
          </div>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="border-t pt-4 mt-6 text-center sm:text-left sm:ml-20">
        <p className="text-xs text-gray-500">© 2025 LuxeCastle.com - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
