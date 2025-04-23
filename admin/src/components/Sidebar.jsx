import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const navLinks = [
    { to: '/add', label: 'Add Items', icon: assets.add_icon },
    { to: '/list', label: 'List Items', icon: assets.order_icon },
    { to: '/orders', label: 'Orders', icon: assets.order_icon },
  ];

  return (
    <div className="w-[18%] min-h-screen bg-[#f7f4e3] border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-6 text-[15px]">
        {navLinks.map(({ to, label, icon }, index) => (
          <NavLink
            key={index}
            to={to}
            className="flex items-center gap-3 px-4 py-2 rounded-l border-l-4 border-transparent hover:border-gray-400 hover:bg-gray-200"
          >
            <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
            <p className="hidden md:block">{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
