import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="about-page">

      {/* About Section Title */}
      <div className="about-title text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Us Content */}
      <section className="about-content my-10 flex flex-col md:flex-row gap-16">
        <img className="about-image w-full md:max-w-[450px]" src={assets.about_img} alt="About Us" />
        <div className="about-description flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          Luxe Castle embodies a harmonious blend of comfort and sophistication, styled with a nature comfort theme that evokes the serene beauty of nature beauty and fairy tales based story. Our concept seamlessly merges casual elegance with refined aesthetics, creating a mature yet approachable luxury vibe. Inspired by the grace of a princess in her castle, Luxe Castle offers a semi-formal ambiance with soft, elegant, and polished touches.
          </p>
          <p>
            Since our catering primarily to women aged 15 to 40+, Luxe Castle also envisions expanding its offerings to include a Princess Castle experience for children in the future.
          </p>
          <strong className="text-gray-800">Our Mission</strong>
          <p>
           Our mission is to elevate our brand's global presence, connecting with a wider audience while dedicating a portion of our profits to charitable causes. By combining cutting-edge technology with a commitment to style, comfort, and social responsibility, Luxe Castle aims to redefine the online shopping experience and create a lasting impact in the world of fashion.
           </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <div className="why-choose-us text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Benefits List */}
      <section className="benefits flex flex-col md:flex-row text-sm mb-20">
        <div className="benefit-item border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Quality Assurance:</strong>
          <p className="text-gray-600">
          We select and evaluate each product to ensure it meets our high-quality standards.
          </p>
        </div>
        <div className="benefit-item border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Convenience:</strong>
          <p className="text-gray-600">
          Experience effortless shopping with our intuitive interface and seamless ordering process – making your shopping journey simpler than ever!
          </p>
        </div>
        <div className="benefit-item border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Exceptional Customer Service:</strong>
          <p className="text-gray-600">
          Our dedicated team of professionals is here to guide you at every step, making sure your satisfaction is our highest priority.
          </p>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <NewsletterBox />

    </div>
  );
};

export default About;
