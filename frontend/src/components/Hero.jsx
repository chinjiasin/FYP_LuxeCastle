import React from 'react';
import { assets } from '../assets/assets';

const Hero= () => {
  return (
    <div className="relative w-full h-full border border-gray-400">
      {/* Hero Image with original size */}
      <img
        src={assets.hero_img}
        alt="New collections"
        className="mx-auto" // Centers the image
      />
    </div>
  );
};

export default Hero;
