import React, { useState, useRef, useEffect } from 'react';
import { X, Eraser, ClipboardList, TestTube2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Expanded list of symptoms (flattened for continuous scrolling)
const suggestedSymptoms = [
  // General Symptoms
  'Fever', 'Fatigue', 'Weight Loss', 'Weight Gain', 'Night Sweats', 'Chills', 'Weakness',
  // Head/Neurological
  'Headache', 'Dizziness', 'Fainting', 'Memory Loss', 'Tremors', 'Seizures', 'Numbness',
  // Respiratory
  'Cough', 'Shortness of Breath', 'Chest Pain', 'Wheezing', 'Sneezing', 'Runny Nose', 'Sore Throat',
  // Digestive
  'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal Pain', 'Bloating', 'Heartburn',
  // Musculoskeletal
  'Joint Pain', 'Back Pain', 'Neck Pain', 'Muscle Pain', 'Swelling', 'Stiffness', 'Limited Movement'
];

// Split symptoms into 3 rows for continuous scrolling
const symptomRows = [
  suggestedSymptoms.slice(0, 15),
  suggestedSymptoms.slice(15, 30),
  suggestedSymptoms.slice(30)
].filter(row => row.length > 0);

const recommendedTests = [
  {
    name: 'Complete Blood Count',
    code: 'CBC',
    description: 'Measures various components of blood including red cells, white cells, and platelets',
    accuracy: '92%',
    preparation: 'Fasting not required',
    turnaround: '24 hours'
  },
  {
    name: 'Thyroid Function Test',
    code: 'TFT',
    description: 'Evaluates thyroid gland function through TSH, T3, and T4 levels',
    accuracy: '95%',
    preparation: 'Fasting may be required',
    turnaround: '48 hours'
  },
  {
    name: 'Liver Function Test',
    code: 'LFT',
    description: 'Assesses liver health through enzyme, protein, and bilirubin levels',
    accuracy: '89%',
    preparation: 'Fasting for 10-12 hours',
    turnaround: '24-48 hours'
  },
  {
    name: 'Urine Analysis',
    code: 'UA',
    description: 'Examines urine for signs of kidney disease, diabetes, or infection',
    accuracy: '85%',
    preparation: 'First morning sample preferred',
    turnaround: '24 hours'
  }
];

const AIRecommendation = () => {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [details, setDetails] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [animationDirections, setAnimationDirections] = useState(symptomRows.map(() => Math.random() > 0.5 ? 'left' : 'right'));
  const suggestionsRefs = useRef([]);
  const inputRef = useRef(null);

  const handleSymptomClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomInput(prev => prev ? `${prev}, ${symptom}` : symptom);
    }
    // Randomly change direction for a random row
    const randomRow = Math.floor(Math.random() * symptomRows.length);
    setAnimationDirections(prev =>
      prev.map((dir, i) => i === randomRow ? (dir === 'left' ? 'right' : 'left') : dir)
    );
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
  };

  const getRecommendations = () => {
    if (symptomInput || details) {
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    const containers = suggestionsRefs.current;
    if (!containers || containers.length === 0) return;

    const scrollSpeeds = containers.map(() => 0.3 + Math.random() * 0.7); // Random speeds between 0.3 and 1.0
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
      }, 16); // ~60fps

      scrollIntervals.push(interval);
    };

    containers.forEach((container, index) => {
      if (container) {
        startScrolling(container, scrollSpeeds[index], animationDirections[index], index);
      }
    });

    // Pause on hover for each container
    const pauseEvents = containers.map((container, index) => {
      if (!container) return { pause: null, resume: null };

      const pauseScrolling = () => {
        clearInterval(scrollIntervals[index]);
        animationFrameIds.forEach(id => cancelAnimationFrame(id));
      };

      const resumeScrolling = () => {
        if (container) {
          startScrolling(container, scrollSpeeds[index], animationDirections[index], index);
        }
      };

      container.addEventListener('mouseenter', pauseScrolling);
      container.addEventListener('mouseleave', resumeScrolling);

      return { pause: pauseScrolling, resume: resumeScrolling };
    });

    return () => {
      scrollIntervals.forEach(interval => clearInterval(interval));
      animationFrameIds.forEach(id => cancelAnimationFrame(id));
      containers.forEach((container, index) => {
        if (container && pauseEvents[index]) {
          container.removeEventListener('mouseenter', pauseEvents[index].pause);
          container.removeEventListener('mouseleave', pauseEvents[index].resume);
        }
      });
    };
  }, [animationDirections]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* First Div - Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-3">Describe Your Symptoms</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-justify">
          Select your symptoms from the options below or type them manually. Our AI will analyze and recommend the most appropriate medical tests.
        </p>
      </div>

      {/* Second Div - Symptom Input with Multiple Rows of Animated Suggestions */}
      <div className="bg-bg-primary rounded-xl shadow-sm p-6 mb-8 border border-border">
        <div className="relative">
          {/* Input Field */}
          <textarea
            ref={inputRef}
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
            placeholder="Your symptoms will appear here as you select them..."
            className="w-full h-32 p-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none text-text-primary bg-bg-secondary"
          />

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSymptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-light text-primary-dark text-sm font-medium"
                >
                  {symptom}
                  <button
                    onClick={() => removeSymptom(symptom)}
                    className="text-primary-dark hover:text-primary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Multiple Rows of Animated Suggestions (no category titles) */}
        <div className="mt-6 space-y-3">
          {symptomRows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div
                ref={el => suggestionsRefs.current[rowIndex] = el}
                className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {row.map((symptom, symptomIndex) => (
                  <button
                    key={symptomIndex}
                    onClick={() => handleSymptomClick(symptom)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${selectedSymptoms.includes(symptom)
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-bg-tertiary text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                      }`}
                  >
                    {symptom}
                  </button>
                ))}
                {/* Duplicate items for seamless looping */}
                {row.map((symptom, symptomIndex) => (
                  <button
                    key={`dup-${symptomIndex}`}
                    onClick={() => handleSymptomClick(symptom)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${selectedSymptoms.includes(symptom)
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-bg-tertiary text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                      }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Third Div - Details Input */}
      <div className="bg-bg-primary rounded-xl shadow-sm p-6 mb-8 border border-border">
        <label className="block text-text-primary font-medium mb-3">Describe Your Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Provide more details about your condition, duration, severity, etc..."
          className="w-full h-40 p-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-text-primary bg-bg-secondary"
        />
      </div>

      {/* Fourth Div - Action Buttons */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={clearAll}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-bg-tertiary text-text-secondary rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          <Eraser className="w-5 h-5" />
          Clear All
        </button>
        <button
          onClick={getRecommendations}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium shadow-md hover:shadow-lg"
        >
          <ClipboardList className="w-5 h-5" />
          Get Test Recommendations
        </button>
      </div>

      {/* Fifth Div - Results */}
      {showResults && (
        <div id="results-section" className="bg-bg-primary rounded-xl shadow-sm p-6 mb-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">Recommended Tests</h2>
            <div className="text-sm text-text-secondary">
              {selectedSymptoms.length} symptoms matched
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {recommendedTests.map((test, index) => (
              <div
                key={index}
                className="border border-border rounded-xl p-5 hover:shadow-md transition-shadow bg-bg-secondary"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-text-primary">{test.name}</h3>
                  <span className="bg-primary-light text-primary-dark text-xs font-medium px-2.5 py-1 rounded-full">
                    {test.code}
                  </span>
                </div>

                <p className="text-sm text-text-secondary mb-4">{test.description}</p>

                <div className="grid grid-cols-4 gap-3 text-xs">
                  <div className="bg-success-light text-success-dark p-2 rounded-lg">
                    <div className="font-medium">Accuracy</div>
                    <div>{test.accuracy}</div>
                  </div>
                  <div className="bg-info-light text-info-dark p-2 rounded-lg">
                    <div className="font-medium">Preparation</div>
                    <div>{test.preparation}</div>
                  </div>
                  <div className="bg-warning-light text-warning-dark p-2 rounded-lg">
                    <div className="font-medium">Turnaround</div>
                    <div>{test.turnaround}</div>
                  </div>
                  <div className="bg-bg-tertiary text-text-secondary p-2 rounded-lg">
                    <div className="font-medium">Sample</div>
                    <div>{test.code === 'UA' ? 'Urine' : 'Blood'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sixth Div - Final Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="all-tests-packages"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium shadow-md"
            >
              <TestTube2 className="w-5 h-5" />
              View Test Packages
            </Link>
            <Link
              to="labs"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors font-medium shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
              Visit Labs for Tests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;