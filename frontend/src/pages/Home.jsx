import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import Voting from '../components/Voting'; // Import the Voting component

const Home = () => {
  return (
    <div>
      <Hero />
      <Voting />  {/* Voting component added here */}
      <LatestCollection />
      <BestSeller /> {/* HighTea.png is handled inside this component now */}
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
