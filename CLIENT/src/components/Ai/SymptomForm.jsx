import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateSymptoms = (input) => {
    const cleaned = input.trim();
    if (!cleaned) return "Please enter at least one symptom.";
    if (/[^a-zA-Z,\s]/.test(cleaned)) return "Only alphabetic characters and commas are allowed (no numbers, emojis, or symbols).";
    const symptomArray = cleaned.split(',').map(s => s.trim()).filter(Boolean);
    if (symptomArray.length < 2) return "Please enter at least two symptoms separated by commas.";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateSymptoms(symptoms);
    if (validationError) {
      setError(validationError);
      setResult([]);
      return;
    }
    setError('');
    setLoading(true);
    const symptomArray = symptoms.split(',').map(s => s.trim());

    try {
      const res = await axios.post("/api/get-recommendation/recommend-tests", {
        symptoms: symptomArray
      });

      if (res.data.success) {
        setResult(res.data.recommendations);
      } else {
        setResult([]);
      }
    } catch (error) {
      console.error("❌ Frontend error:", error.message);
      setResult([]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6 mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Symptoms</label>
      <textarea
        className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        rows={4}
        placeholder="e.g. fever, cough, headache"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      {error && <div className="text-sm text-red-600 mt-2 font-medium">{error}</div>}

      <button
        className="mt-4 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Get Lab Test Recommendations"}
      </button>

      {result && result.length > 0 && (
  <div className="mt-6">
    <h3 className="text-black font-semibold text-lg mb-4">🔬 AI Suggestions based on your symptoms:</h3>
    <div className="grid gap-4 sm:grid-cols-2">
      {result.map((item, idx) => (
        <div key={idx} className="bg-gray-50 border border-indigo-100 rounded-xl p-4 shadow-sm relative">
          <div className="absolute top-2 right-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
            {item.accuracy ? `${item.accuracy}%` : 'N/A'}
          </div>
          <h4 className="text-indigo-800 font-bold text-sm mb-1">🧪 {item.test}</h4>
          <p className="text-gray-600 text-xs leading-relaxed">{item.reason}</p>
        </div>
      ))}
    </div>

    {/* Button to go to lab test page */}
    <div className="mt-6 text-center">
      <button
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
        onClick={() => navigate('/labs')} 
      >
        🔍 Find Labs Offering These Tests
      </button>
    </div>
  </div>
)}


      {result && result.length === 0 && !error && (
        <div className="mt-6 text-sm text-red-600 font-medium">
          No specific tests recommended. Please consult a doctor.
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
