import React, { useContext, useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

// Lazy load TryOnAR
const TryOnAR = React.lazy(() => import('../components/TryOnAR.jsx'));

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showTryOn, setShowTryOn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setSelectedImage(product.image?.[0] || '');

        // Load AR clothing image
        const img = new Image();
        img.src = product.image?.[0];
        setClothingItems([
          {
            type: product.type || 'top', // fallback to 'top' if undefined
            image: img
          }
        ]);
      }
    };
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      {/* Product Section */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18.7%] w-full gap-2 sm:gap-0">
            {productData.image?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImage(img)}
                className="w-[24%] sm:w-full cursor-pointer flex-shrink-0 sm:mb-3"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={selectedImage} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="text-3xl font-medium mt-5">
            {currency}{productData.price}
          </p>

          <p className="text-gray-500 mt-5 md:w-4/5">{productData.description}</p>

          {/* Size Selection */}
          <div className="my-8 flex flex-col gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 ${selectedSize === size ? 'border-orange-500' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <button
            onClick={() => setShowTryOn(prev => !prev)}
            className="bg-orange-500 text-white px-8 py-3 text-sm mt-4"
          >
            {showTryOn ? 'HIDE AR TRY-ON' : 'TRY ON'}
          </button>

          {/* AR Component Mount */}
          {showTryOn && (
            <Suspense fallback={<div>Loading AR...</div>}>
              <TryOnAR clothingItems={clothingItems} />
            </Suspense>
          )}

          {/* Product Notes */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or
            services over the internet. It serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images,
            prices, and any available variations (e.g., sizes, colors).
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
