import React from 'react';
import SymptomForm from './SymptomForm';

const AIRecommendation = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14 font-sans text-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">AI Test Recommendations</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Enter your symptoms, and our AI will analyze them to suggest medical tests.
      </p>

      <SymptomForm />
    </div>
  );
};

export default AIRecommendation;
