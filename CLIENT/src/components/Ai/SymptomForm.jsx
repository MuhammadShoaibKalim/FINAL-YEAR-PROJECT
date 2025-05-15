import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const medicalTermsPattern = /^[a-zA-Z\s,.\-]+$/;
const irrelevantPatterns = [
  /\b(boy|girl|man|woman|school|run|play|game|food|water|drink|hello|hi)\b/i,
  /[^\w\s,.\-]/,
];

const symptomOptions = [
  "Fever", "Cough", "Headache", "Fatigue", "Shortness of breath",
  "Sore throat", "Nausea", "Vomiting", "Diarrhea", "Muscle pain"
];

const SymptomForm = () => {
  const [mode, setMode] = useState('description');
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isMedicalContext = (text) => {
    if (!medicalTermsPattern.test(text)) return false;
    return !irrelevantPatterns.some(pattern => pattern.test(text));
  };

  const validateDescription = (input) => {
    const cleaned = input.trim();
    
    if (!cleaned) return "Please describe your symptoms in detail.";
    if (cleaned.length < 10) return "Description is too short. Please give more details.";
    if (!isMedicalContext(cleaned)) {
      return "Please focus on medical symptoms. Avoid numbers, symbols, or unrelated text.";
    }
    return null;
  };

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    setResult(null); // Reset result

    try {
      // Validation
      if (mode === 'description') {
        const validationError = validateDescription(symptoms);
        if (validationError) {
          setError(validationError);
          setLoading(false);
          return;
        }
      } else if (selectedSymptoms.length === 0) {
        setError('Please select at least one symptom.');
        setLoading(false);
        return;
      }

      const payload = mode === 'description'
        ? { description: symptoms }
        : { symptoms: selectedSymptoms };

      const res = await axios.post('/api/get-recommendation/recommend-tests', payload);

      // Handle both response formats
      const recommendations = res.data.recommendedTests || res.data.recommendations || [];
      
      if (recommendations.length > 0) {
        setResult(recommendations);
      } else {
        setError('No specific tests recommended. Please consult a doctor.');
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6 mb-6 max-w-3xl mx-auto">
      {/* Mode switch */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => {
            setMode('description');
            setError('');
            setResult(null);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            mode === 'description'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          📝 Description
        </button>
        <button
          onClick={() => {
            setMode('checklist');
            setError('');
            setResult(null);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            mode === 'checklist'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          ✅ Checklist
        </button>
      </div>

      {/* Form */}
      {mode === 'description' ? (
        <>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Describe your symptoms in detail
          </label>
          <textarea
            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={5}
            placeholder="e.g. I've had a sore throat and mild fever for the last 2 days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={loading}
          />
        </>
      ) : (
        <>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select your symptoms:
          </label>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {symptomOptions.map((symptom) => (
              <label key={symptom} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleCheckboxChange(symptom)}
                  className="accent-primary"
                  disabled={loading}
                />
                {symptom}
              </label>
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="text-sm text-red-600 mt-2 font-medium">{error}</div>
      )}

      <button
        className={`mt-4 bg-primary text-white px-5 py-2.5 rounded-lg font-medium transition w-full ${
          loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          "Get Lab Test Recommendations"
        )}
      </button>

      {/* Results Section */}
      {loading ? null : result ? (
        <>
          {result.length > 0 ? (
            <div className="mt-6 animate-fade-in">
              <h3 className="text-black font-semibold text-lg mb-4">
                🔬 Recommended Tests:
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {result.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-indigo-100 rounded-xl p-4 shadow-sm relative">
                    <div className="absolute top-2 right-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      {item.accuracy ? `${item.accuracy}%` : 'High'}
                    </div>
                    <h4 className="text-indigo-800 font-bold text-sm mb-1">
                      🧪 {item.test || item.name}
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {item.reason || item.description}
                    </p>
                    {item.turnaround && (
                      <p className="text-xs mt-2 text-gray-500">
                        ⏱️ Turnaround: {item.turnaround}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
                  onClick={() => navigate('/labs')}
                >
                  🔍 Find Labs Offering These Tests
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center text-gray-600 font-medium">
              No specific tests recommended based on your symptoms. Please consult a healthcare provider.
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SymptomForm;