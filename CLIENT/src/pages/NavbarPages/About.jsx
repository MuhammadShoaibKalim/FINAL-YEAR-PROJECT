import React, { useState } from 'react';
import Features from './Features';


const About = () => {

  return (
    <div className="bg-bg-primary py-10 px-4 md:px-20 lg:px-40">
    {/* About Us Section */}
      <div className="w-full text-center mb-10">
        <p className="text-center mb-5 text-primary font-bold text-4xl">INTRODUCING</p>
        <h4 className="text-center mb-5 text-3xl font-bold italic text-text-primary">LabCore: Empowering Healthcare with Technology</h4>
        <p className="text-text-primary text-justify text-2xl">
          LabCore is an innovative healthcare platform designed to provide patients with an efficient, transparent, and user-friendly system to manage laboratory tests. 
          From symptom analysis to personalized test recommendations, LabCore enhances the healthcare journey by centralizing medical test information, facilitating comparisons, 
          and streamlining appointment bookings—all in one place.
        </p>
       
      </div>

       <Features/>
     
  
    </div>
  );
};

export default About;
