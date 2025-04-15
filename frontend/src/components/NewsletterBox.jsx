import React, { useState } from 'react';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add email submission logic here (e.g., API call)
    alert(`Thank you for subscribing with email: ${email}`);
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Subscribe & Get 25% Off!
        </h2>
        <p className="text-sm text-gray-500 mt-3 mb-6">
          Don’t miss out on exclusive offers and the latest trends. Subscribe now!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs sm:text-sm px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;
