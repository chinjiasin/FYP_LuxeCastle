import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const HighTeaCollections = () => {
  const { products } = useContext(ShopContext);
  const [highTeaProducts, setHighTeaProducts] = useState([]);

  useEffect(() => {
    // Filtering best-selling products from the product list
    const highTeaCollection = products.filter((item) => item.bestseller);
    setHighTeaProducts(highTeaCollection.slice(0, 5)); // Display the top 5 products
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1="HIGH TEA" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        High Tea Collections feature a curated selection of timeless outfits perfect for afternoon tea. Each piece combines classic charm with modern style, offering refined comfort and grace for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {highTeaProducts.map((item, index) => (
          <ProductItem
            key={item._id} // Use item._id as the key for better performance
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HighTeaCollections;
