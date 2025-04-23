import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="w-full">
      <img
        src={assets.hero_img}
        alt="New collections"
        className="w-full object-cover"
      />
    </div>
  );
};

export default Hero;
