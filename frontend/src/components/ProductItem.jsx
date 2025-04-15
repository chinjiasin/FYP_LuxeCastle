import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Utility to scroll to top on click
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={`/product/${id}`}
      className="product-item text-gray-700 cursor-pointer"
      onClick={handleScrollToTop}
    >
      <div className="product-image overflow-hidden relative">
        <img
          className="transition-transform duration-300 transform hover:scale-110"
          src={image[0]}
          alt={name}
        />
      </div>

      <div className="product-details pt-3 pb-1">
        <p className="product-name text-sm">{name}</p>
        <p className="product-price text-sm font-medium">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
