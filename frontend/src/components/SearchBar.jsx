import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Effect to determine if search bar should be visible based on the route
  useEffect(() => {
    const isInCollectionPage = location.pathname.includes('collection');
    setIsVisible(isInCollectionPage);
  }, [location]);

  // Handle closing the search bar
  const handleCloseSearch = () => setShowSearch(false);

  // Handle updating the search query
  const handleSearchChange = (e) => setSearch(e.target.value);

  return showSearch && isVisible ? (
    <div className="search-bar border-t border-b bg-gray-50 text-center">
      <div className="search-input-wrapper inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={handleSearchChange}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="Search Icon" />
      </div>
      <img
        onClick={handleCloseSearch}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close Search"
      />
    </div>
  ) : null;
};

export default SearchBar;
