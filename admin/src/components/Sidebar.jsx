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
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {navLinks.map(({ to, label, icon }, index) => (
          <SidebarLink key={index} to={to} label={label} icon={icon} />
        ))}
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
  >
    <img className="w-5 h-5" src={icon} alt={`${label} icon`} />
    <p className="hidden md:block">{label}</p>
  </NavLink>
);

export default Sidebar;
