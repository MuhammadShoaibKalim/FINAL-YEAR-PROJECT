import React from 'react';
import MetaTags from '../../components/MetaTags';
import Hero from '../Home/Hero';
import HeroFeatures from '../Home/HeroFeatures';
import TestByHConcern from '../Home/TestByHConcern';
import MostUsed from '../Home/MostUsed'
import OurColl from '../Home/OurColl';
import FAQ from '../Home/FAQ';
import UserReview from '../Home/UserRev';
import CommonSymptoms from '../Home/CommonSymptoms';
import WhyUs from './WhyUs';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-tb from-white via-gray to-white ">
            <MetaTags title="Home" description="Welcome to TestSahulat - Your partner in diagnostic healthcare." />
            <Hero />
            <HeroFeatures />
            <CommonSymptoms/>
            <TestByHConcern />
            <WhyUs/>
            <MostUsed />
            <FAQ />
            <UserReview/>
            <OurColl />
        </div>  
    );
};

export default Home;
