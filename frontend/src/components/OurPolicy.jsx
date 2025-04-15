import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      description: 'We offer hassle-free exchange policy.',
    },
    {
      icon: assets.quality_icon,
      title: '7 Days Return Policy',
      description: 'We provide a 7-day free return policy.',
    },
    {
      icon: assets.support_img,
      title: 'Best Customer Support',
      description: 'We offer 24/7 customer support.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10 text-gray-800">Our Policies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm sm:text-base text-gray-700">
          {policies.map((policy, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={policy.icon} alt={policy.title} className="w-16 mb-5" />
              <p className="font-semibold text-gray-800">{policy.title}</p>
              <p className="text-gray-500">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
