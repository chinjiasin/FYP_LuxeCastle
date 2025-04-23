import React, { useContext, useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const TryOnAR = React.lazy(() => import('../components/TryOnAR.jsx'));

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showTryOn, setShowTryOn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // State to track notification visibility

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setSelectedImage(product.image?.[0] || '');

        const img = new Image();
        img.src = product.image?.[0];
        setClothingItems([
          {
            type: product.type || 'top',
            image: img
          }
        ]);
      }
    };
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(productData._id, selectedSize); // Only add to cart if a size is selected
      setShowNotification(true); // Show the notification when item is added
      setTimeout(() => setShowNotification(false), 3000); // Hide it after 3 seconds
    } else {
      alert("Please select a size before adding to cart!"); // Optionally, show an alert if no size is selected
    }
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">
          <p>Your item has been added to the cart!</p>
        </div>
      )}

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
            onClick={handleAddToCart} // Call the function when clicked
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

      {/* Description & Size Chart */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>SIZE CHART:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border text-gray-600">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Size</th>
                  <th className="px-4 py-2 border">Chest</th>
                  <th className="px-4 py-2 border">Width</th>
                  <th className="px-4 py-2 border">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 border">S</td>
                  <td className="px-4 py-2 border">34"</td>
                  <td className="px-4 py-2 border">32"</td>
                  <td className="px-4 py-2 border">20"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">M</td>
                  <td className="px-4 py-2 border">36"</td>
                  <td className="px-4 py-2 border">34"</td>
                  <td className="px-4 py-2 border">20.5"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 border">L</td>
                  <td className="px-4 py-2 border">38"</td>
                  <td className="px-4 py-2 border">36"</td>
                  <td className="px-4 py-2 border">20.5"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 border">XL</td>
                  <td className="px-4 py-2 border">40"</td>
                  <td className="px-4 py-2 border">38"</td>
                  <td className="px-4 py-2 border">22.5"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 border">XXL</td>
                  <td className="px-4 py-2 border">42"</td>
                  <td className="px-4 py-2 border">40"</td>
                  <td className="px-4 py-2 border">24.5"</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-2">* All measurements are in inches.</p>
          </div>

          <p>
            CARING INSTRUCTIONS
            <br />
            Wash Instructions
            ◦ Turn your piece inside out before washing garment.
            ◦ Recommend to put garment in a mesh bag for machine wash.
            ◦ Hand wash or machine wash with a gentle cycle in cold water.
            ◦ Avoid bleach-based products / stain removers and aggressive detergents.
            ◦ If hand wash, gently squeeze out the excess water – do not wring.
            ◦ Lay flat to dry, iron on low if needed with garment inside out.
            <br />
            Care Disclaimers
            ◦ Garment color may fade over time.
            ◦ Snag issue might happen from harsh abrasion.
            ◦ High heat will cause shrinkage of garment.
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
