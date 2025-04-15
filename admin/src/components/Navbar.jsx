import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('');
  };

  return (
    <header className="flex items-center justify-between px-4 py-2">
      {/* Logo Section */}
      <div className="w-[max(10%,80px)]">
        <img src={assets.logo} alt="Company Logo" className="w-full" />
      </div>

      {/* Logout Button */}
      <LogoutButton onClick={handleLogout} />
    </header>
  );
};

// Reusable Logout Button Component
const LogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
  >
    Logout
  </button>
);

export default Navbar;
