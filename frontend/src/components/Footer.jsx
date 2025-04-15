import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="mt-40 mb-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between text-sm">
        
        {/* Left Column: Logo and Description */}
        <div className="mb-8 sm:mb-0">
          <img src={assets.logo} alt="Logo" className="w-32 mb-5" />
          <p className="text-gray-600 max-w-xs md:max-w-md">
          Luxe Castle established in 2018 embodies a harmonious blend of comfort and sophistication.Our concept inspired by the grace of a princess in her castle, Luxe Castle offers a semi-formal ambiance with soft, elegant, and polished touches. 
          </p>
        </div>

        {/* Middle Column: Company Links */}
        <div className="flex flex-col mb-8 sm:mb-0">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Column: Contact Info */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 text-gray-600">
            <li>+60-945-7783</li>
            <li>contact@LuxeCastleHere.com</li>
          </ul>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="border-t pt-4">
        <p className="text-center text-xs text-gray-500">Copyright 2025@ LuxeCastle.com - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
