import React, { useState, useRef, useEffect } from 'react';
import { X, Eraser, ClipboardList, TestTube2, ChevronRight, Clock, FlaskConical, CalendarDays, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const suggestedSymptoms = [
  'Fever', 'Fatigue', 'Weight Loss', 'Weight Gain', 'Night Sweats', 'Chills', 'Weakness',
  'Headache', 'Dizziness', 'Fainting', 'Memory Loss', 'Tremors', 'Seizures', 'Numbness',
  'Cough', 'Shortness of Breath', 'Chest Pain', 'Wheezing', 'Sneezing', 'Runny Nose', 'Sore Throat',
  'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal Pain', 'Bloating', 'Heartburn',
  'Joint Pain', 'Back Pain', 'Neck Pain', 'Muscle Pain', 'Swelling', 'Stiffness', 'Limited Movement'
];

const symptomRows = [
  suggestedSymptoms.slice(0, 15),
  suggestedSymptoms.slice(15, 30),
  suggestedSymptoms.slice(30)
].filter(row => row.length > 0);

const medicalTermsPattern = /^[a-zA-Z\s,.-]+$/;
const irrelevantPatterns = [
  /\b(boy|girl|man|woman|school|run|play|game|food|water|drink|hello|hi)\b/i,
  /\d/,
  /[^\w\s,.-]/,
];

const AIRecommendation = () => {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [details, setDetails] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [animationDirections, setAnimationDirections] = useState(symptomRows.map(() => Math.random() > 0.5 ? 'left' : 'right'));
  const [loading, setLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState('');
  const [error, setError] = useState('');
  const suggestionsRefs = useRef([]);

  const isMedicalContext = (text) => {
    if (!medicalTermsPattern.test(text)) return false;
    return !irrelevantPatterns.some(pattern => pattern.test(text));
  };

  const validateInputs = () => {
    if (selectedSymptoms.length === 0 && !details.trim()) {
      setError('Please enter at least one symptom or description');
      return false;
    }

    if (details.trim() && !isMedicalContext(details)) {
      setError('Please enter medically relevant information only. Avoid numbers, symbols, or unrelated text.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSymptomClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      const newSymptoms = [...selectedSymptoms, symptom];
      setSelectedSymptoms(newSymptoms);
      setSymptomInput(newSymptoms.join(', '));
    }
  };

  const removeSymptom = (symptomToRemove) => {
    const updatedSymptoms = selectedSymptoms.filter(symptom => symptom !== symptomToRemove);
    setSelectedSymptoms(updatedSymptoms);
    setSymptomInput(updatedSymptoms.join(', '));
  };

  const clearAll = () => {
    setSymptomInput('');
    setSelectedSymptoms([]);
    setDetails('');
    setShowResults(false);
    setRecommendations([]);
    setLoading(false);
    setAnalysisText('');
    setError('');
  };

  const getRecommendations = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setAnalysisText('Analyzing your symptoms...');
    setShowResults(false);
    setRecommendations([]);

    try {
      const response = await axios.post('/api/get-recommendation/recommend-tests', {
        description: details,
        symptoms: selectedSymptoms
      });

      const data = response.data;
      
      if (data.recommendedTests?.length > 0 || data.recommendations?.length > 0) {
        // Enhance the test data with default values if not provided
        const enhancedTests = (data.recommendedTests || data.recommendations).map(test => ({
          ...test,
          accuracy: test.accuracy || 'High (90-95%)',
          turnaround: test.turnaround || '1-3 business days',
          preparation: test.preparation || 'Fasting for 8-12 hours required',
          sample: test.sample || 'Blood sample'
        }));
        
        setRecommendations(enhancedTests);
        setShowResults(true);
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError('No specific tests recommended based on your symptoms. Please consult a healthcare provider.');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError(error.response?.data?.message || 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
      setAnalysisText('');
    }
  };

  useEffect(() => {
    const containers = suggestionsRefs.current;
    if (!containers || containers.length === 0) return;

    const scrollSpeeds = containers.map(() => 0.3 + Math.random() * 0.7);
    const scrollIntervals = [];
    const animationFrameIds = [];

    const startScrolling = (container, speed, direction, index) => {
      const interval = setInterval(() => {
        const frameId = requestAnimationFrame(() => {
          if (direction === 'left') {
            container.scrollLeft += speed;
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
              setAnimationDirections(prev => {
                const newDirs = [...prev];
                newDirs[index] = 'right';
                return newDirs;
              });
            }
          } else {
            container.scrollLeft -= speed;
            if (container.scrollLeft <= 0) {
              setAnimationDirections(prev => {
                const newDirs = [...prev];
                newDirs[index] = 'left';
                return newDirs;
              });
            }
          }
        });
        animationFrameIds.push(frameId);
      }, 16);
      scrollIntervals.push(interval);
    };

    containers.forEach((container, index) => {
      if (container) {
        startScrolling(container, scrollSpeeds[index], animationDirections[index], index);
      }
    });

    const pauseEvents = containers.map((container, index) => {
      const pause = () => {
        clearInterval(scrollIntervals[index]);
        animationFrameIds.forEach(id => cancelAnimationFrame(id));
      };
      const resume = () => {
        if (container) {
          startScrolling(container, scrollSpeeds[index], animationDirections[index], index);
        }
      };
      container.addEventListener('mouseenter', pause);
      container.addEventListener('mouseleave', resume);
      return { pause, resume };
    });

    return () => {
      scrollIntervals.forEach(interval => clearInterval(interval));
      animationFrameIds.forEach(id => cancelAnimationFrame(id));
      containers.forEach((container, index) => {
        if (pauseEvents[index]) {
          container.removeEventListener('mouseenter', pauseEvents[index].pause);
          container.removeEventListener('mouseleave', pauseEvents[index].resume);
        }
      });
    };
  }, [animationDirections]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Describe Your Symptoms</h1>
        <p className="text-gray-600 max-w-4xl mx-auto">
          Select your symptoms from the options below or describe them manually. Our AI will analyze and recommend the most appropriate medical tests.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selected Symptoms</label>
          <textarea
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
            placeholder="Your symptoms will appear here as you select them..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-secondary outline-none resize-none text-gray-800 bg-gray-50"
            readOnly
            disabled={loading}
          />
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSymptoms.map((symptom, index) => (
                <div key={index} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-white text-sm font-medium">
                  {symptom}
                  <button 
                    onClick={() => removeSymptom(symptom)} 
                    className="hover:text-blue-600"
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Common Symptoms</h3>
          {symptomRows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div
                ref={el => suggestionsRefs.current[rowIndex] = el}
                className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {[...row, ...row].map((symptom, symptomIndex) => (
                  <button
                    key={`${rowIndex}-${symptomIndex}`}
                    onClick={() => handleSymptomClick(symptom)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    disabled={loading}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Details (Optional but Recommended)
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Provide more details about your condition, duration, severity, etc..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none text-gray-800 bg-gray-50"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          disabled={loading}
        >
          <Eraser className="w-5 h-5" /> Clear All
        </button>
        <button
          onClick={getRecommendations}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-secondary shadow-md'
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <ClipboardList className="w-5 h-5" /> Get Recommendations
            </>
          )}
        </button>
      </div>

      {analysisText && (
        <div className="text-center text-gray-500 mb-6">
          <div className="inline-flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {analysisText}
          </div>
        </div>
      )}

      {showResults && (
        <div id="results-section" className="bg-white border border-gray-200 rounded-xl shadow-md p-6 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TestTube2 className="w-5 h-5 text-primary" />
            Recommended Medical Tests
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((test, index) => (
              <div key={index} className="p-5 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {test.name || test.test} 
                      {test.code && <span className="text-sm text-gray-500 ml-2">({test.code})</span>}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {test.description || test.reason}
                    </p>
                  </div>
                  <div className=" text-white bg-primary text-xs font-medium px-2 py-1 rounded-full">
                    Test
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Accuracy</p>
                      <p className="text-sm font-medium text-gray-700">{test.accuracy}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Turnaround</p>
                      <p className="text-sm font-medium text-gray-700">{test.turnaround}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CalendarDays className="w-4 h-4 text-purple-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Preparation</p>
                      <p className="text-sm font-medium text-gray-700">{test.preparation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <FlaskConical className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Sample Required</p>
                      <p className="text-sm font-medium text-gray-700">{test.sample}</p>
                    </div>
                  </div>
                </div>
                
                {/* 
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    to="/labs"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Find labs offering this test <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div> */}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/all-tests-package"
              className="inline-flex items-center gap-2 bg-primary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              view all test and package <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;