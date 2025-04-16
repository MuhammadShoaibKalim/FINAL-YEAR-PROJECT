import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { 
  FaStethoscope, FaLungs, FaHeartbeat, FaCapsules, 
  FaTemperatureHigh, FaSyringe, FaArrowLeft, FaTooth, FaEye,
  FaHeart, FaWeight, FaBed, FaMoon, FaSun, FaTint, FaFlask, 
  FaFemale, FaBalanceScale, FaThermometer, FaHeadSideCough, FaTired, FaBrain,
} from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { FaHome } from 'react-icons/fa';

import { 
  MdMemory, MdWaterDrop, MdScale, MdThermostat, MdMedicalServices,
  MdPerson, MdNightlight, MdSunny,
} from 'react-icons/md';

// Game Icons (Specialized medical icons)
import { 
  GiBrain, GiCircuitry, GiStomach, GiBoneKnife, GiBrokenBone, 
  GiWeightScale, GiLungs,
} from 'react-icons/gi';

// Weather Icons (Environment-related)
import { 
  WiDayCloudy, WiNightAltCloudy, WiHumidity, WiThermometer
} from 'react-icons/wi';

// Health Icons (Specialized medical)
import { 
  HiOutlineHeart, HiOutlineScale,
  HiOutlineUser, HiOutlineMoon, HiOutlineSun
} from 'react-icons/hi';





// import { FaBone } from "react-icons/fa6"; 



const SymptomDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { symptomId } = useParams();
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const handleBackToHome = () => {
    navigate('/');
  };

  const symptoms = [
    {
      id: 'fever',
      name: 'Fever',
      icon: FaTemperatureHigh,
      description: 'A fever is a temporary increase in body temperature, often due to an illness. Having a fever is a sign that something out of the ordinary is going on in your body.',
      causes: [
        'Viral infections (flu, cold)',
        'Bacterial infections',
        'Heat exhaustion',
        'Certain inflammatory conditions',
        'Some medications'
      ],
      treatments: [
        'Rest and hydration',
        'Over-the-counter fever reducers',
        'Cool compresses',
        'Light clothing',
        'Medical attention if persists'
      ],
      whenToSeeDoctor: 'Seek medical attention if fever is above 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms.'
    },
    {
      id: 'cough',
      name: 'Cough',
      icon: FaHeadSideCough,
      description: 'A cough is a reflex action to clear your airways of mucus and irritants such as dust or smoke. Coughs can be wet or dry.',
      causes: [
        'Common cold or flu',
        'Allergies',
        'Asthma',
        'Smoking',
        'Infections'
      ],
      treatments: [
        'Over-the-counter medications',
        'Honey and warm liquids',
        'Steam inhalation',
        'Rest',
        'Avoiding irritants'
      ],
      whenToSeeDoctor: 'See a doctor if your cough persists for more than 3 weeks or is accompanied by blood or difficulty breathing.'
    },
    {
      id: 'headache',
      name: 'Headache',
      icon: GiBrain,
      description: 'Headaches are pain or discomfort in the head, scalp, or neck. They can range from mild to severe and can be primary or secondary.',
      causes: [
        'Stress',
        'Muscle tension',
        'Dehydration',
        'Eye strain',
        'Sinus problems'
      ],
      treatments: [
        'Over-the-counter pain relievers',
        'Rest in a quiet, dark room',
        'Hydration',
        'Massage',
        'Cold or warm compresses'
      ],
      whenToSeeDoctor: 'Seek immediate medical attention for sudden, severe headaches or those accompanied by confusion, fever, or stiff neck.'
    },
    {
      id: 'sore-throat',
      name: 'Sore Throat',
      icon: FaStethoscope,
      description: 'A sore throat is pain, scratchiness or irritation of the throat that often worsens when you swallow.',
      causes: [
        'Viral infections',
        'Bacterial infections',
        'Allergies',
        'Dry air',
        'Overuse of voice'
      ],
      treatments: [
        'Gargling with salt water',
        'Throat lozenges',
        'Warm liquids',
        'Rest voice',
        'Pain relievers'
      ],
      whenToSeeDoctor: 'See a doctor if sore throat is severe, lasts longer than a week, or is accompanied by difficulty breathing.'
    },
    {
      id: 'fatigue',
      name: 'Fatigue',
      icon: FaTired,
      description: 'Fatigue is a feeling of constant tiredness or weakness that can be physical, mental, or a combination of both.',
      causes: [
        'Lack of sleep',
        'Poor diet',
        'Stress',
        'Medical conditions',
        'Medications'
      ],
      treatments: [
        'Regular exercise',
        'Balanced diet',
        'Adequate sleep',
        'Stress management',
        'Medical evaluation if persistent'
      ],
      whenToSeeDoctor: 'Consult a doctor if fatigue persists for more than 2 weeks or is accompanied by other concerning symptoms.'
    },
    {
      id: 'nausea',
      name: 'Nausea',
      icon: GiStomach,
      description: 'An uneasiness of the stomach that often comes before vomiting.',
      causes: [
        'Food poisoning',
        'Motion sickness',
        'Pregnancy',
        'Medications',
        'Infections'
      ],
      treatments: [
        'Ginger tea',
        'Clear fluids',
        'Rest',
        'Small, frequent meals',
        'Anti-nausea medications'
      ],
      whenToSeeDoctor: 'Seek medical attention if nausea persists, is severe, or is accompanied by other symptoms.'
    },
    {
      id: 'dizziness',
      name: 'Dizziness',
      icon: GiStomach,
      description: 'A range of sensations including feeling faint, woozy, weak or unsteady.',
      causes: [
        'Inner ear problems',
        'Low blood pressure',
        'Dehydration',
        'Medications',
        'Anxiety'
      ],
      treatments: [
        'Hydration',
        'Balance exercises',
        'Medications',
        'Rest',
        'Medical evaluation'
      ],
      whenToSeeDoctor: 'Seek medical attention if dizziness is severe, persistent, or accompanied by other symptoms.'
    },
    {
      id: 'chest-pain',
      name: 'Chest Pain',
      icon: HiOutlineHeart,
      description: 'Chest pain can be a sign of various conditions, from minor issues to serious heart problems.',
      causes: [
        'Heart problems',
        'Muscle strain',
        'Acid reflux',
        'Anxiety',
        'Lung conditions'
      ],
      treatments: [
        'Emergency medical care',
        'Medications',
        'Lifestyle changes',
        'Stress management',
        'Regular check-ups'
      ],
      whenToSeeDoctor: 'Seek immediate medical attention for any unexplained chest pain, especially if severe or accompanied by other symptoms.'
    },
    {
      id: 'rash',
      name: 'Skin Rash',
      icon: FaFlask,
      description: 'A rash is a noticeable change in the texture or color of your skin. Your skin may become scaly, bumpy, itchy, or otherwise irritated.',
      causes: [
        'Allergies',
        'Infections',
        'Heat',
        'Medications',
        'Autoimmune conditions'
      ],
      treatments: [
        'Antihistamines',
        'Topical creams',
        'Cool compresses',
        'Avoiding triggers',
        'Moisturizing'
      ],
      whenToSeeDoctor: 'See a doctor if the rash is widespread, painful, or accompanied by other symptoms.'
    },
    {
      id: 'back-pain',
      name: 'Back Pain',
      icon: MdMemory,
      description: 'Back pain can range from a muscle aching to a shooting, burning or stabbing sensation.',
      causes: [
        'Muscle strain',
        'Bulging disks',
        'Arthritis',
        'Osteoporosis',
        'Poor posture'
      ],
      treatments: [
        'Exercise',
        'Physical therapy',
        'Pain relievers',
        'Hot/cold therapy',
        'Proper posture'
      ],
      whenToSeeDoctor: 'Seek medical attention if back pain is severe, persists more than a few weeks, or spreads down the legs.'
    },
    {
      id: 'anxiety',
      name: 'Anxiety',
      icon: MdMemory,
      description: 'Anxiety is your body\'s natural response to stress. It\'s a feeling of fear or apprehension about what\'s to come.',
      causes: [
        'Stress',
        'Trauma',
        'Genetics',
        'Medical conditions',
        'Substance use'
      ],
      treatments: [
        'Therapy',
        'Meditation',
        'Exercise',
        'Medications',
        'Support groups'
      ],
      whenToSeeDoctor: 'Seek help if anxiety interferes with daily activities or causes significant distress.'
    },
    {
      id: 'joint-pain',
      name: 'Joint Pain',
      icon: GiBoneKnife,
      description: 'Discomfort, aches, and soreness in any of the body\'s joints.',
      causes: [
        'Arthritis',
        'Injury',
        'Overuse',
        'Infections',
        'Autoimmune diseases'
      ],
      treatments: [
        'Rest',
        'Physical therapy',
        'Pain relievers',
        'Hot/cold therapy',
        'Exercise'
      ],
      whenToSeeDoctor: 'See a doctor if joint pain is severe, persistent, or accompanied by swelling or redness.'
    },
    {
      id: 'weight-loss',
      name: 'Unexplained Weight Loss',
      icon: GiWeightScale,
      description: 'A decrease in body weight that occurs without trying.',
      causes: [
        'Hyperthyroidism',
        'Diabetes',
        'Depression',
        'Cancer',
        'Digestive disorders'
      ],
      treatments: [
        'Nutritional counseling',
        'Medical evaluation',
        'Dietary changes',
        'Exercise',
        'Treatment of underlying cause'
      ],
      whenToSeeDoctor: 'Consult a doctor if you lose more than 5% of your body weight in 6-12 months without trying.'
    },
    {
      id: 'insomnia',
      name: 'Insomnia',
      icon: FaBed,
      description: 'Difficulty falling asleep or staying asleep.',
      causes: [
        'Stress',
        'Anxiety',
        'Depression',
        'Poor sleep habits',
        'Medical conditions'
      ],
      treatments: [
        'Sleep hygiene',
        'Cognitive behavioral therapy',
        'Relaxation techniques',
        'Medications',
        'Lifestyle changes'
      ],
      whenToSeeDoctor: 'See a doctor if insomnia affects your daily activities or persists for more than a few weeks.'
    },
    {
      id: 'shortness-breath',
      name: 'Shortness of Breath',
      icon: FaLungs,
      description: 'Difficulty breathing or feeling like you can\'t get enough air.',
      causes: [
        'Asthma',
        'Anxiety',
        'Heart conditions',
        'Lung diseases',
        'Allergies'
      ],
      treatments: [
        'Breathing exercises',
        'Medications',
        'Oxygen therapy',
        'Lifestyle changes',
        'Medical evaluation'
      ],
      whenToSeeDoctor: 'Seek immediate medical attention if shortness of breath is severe, sudden, or accompanied by chest pain.'
    }
  ];

  useEffect(() => {
    // Check if we have a selected symptom from navigation state
    if (location.state?.selectedSymptom) {
      const symptom = symptoms.find(s => s.id === location.state.selectedSymptom);
      if (symptom) {
        setSelectedSymptom(symptom);
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary">
      {/* Header */}
      <div className="relative py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            {selectedSymptom && (
              <button 
                onClick={() => setSelectedSymptom(null)}
                className="inline-flex items-center text-text-primary hover:text-primary transition-all duration-300"
              >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Symptoms
              </button>
            )}
            <button 
              onClick={handleBackToHome}
              className="inline-flex items-center text-text-primary hover:text-primary transition-all duration-300"
            >
              <FaHome className="mr-2" />
              Back to Home
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {selectedSymptom ? selectedSymptom.name : 'Symptom Details'}
          </h1>
          <p className="text-xl text-text-secondary">
            Comprehensive information about common symptoms and their management
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedSymptom ? (
          // Detailed view of selected symptom
          <div className="bg-bg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-lg shadow-primary/5">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <selectedSymptom.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-text-primary">{selectedSymptom.name}</h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Description</h3>
                <p className="text-text-secondary">{selectedSymptom.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Common Causes</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {selectedSymptom.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Treatment Options</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {selectedSymptom.treatments.map((treatment, index) => (
                    <li key={index}>{treatment}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <h3 className="text-xl font-semibold text-text-primary mb-4">When to See a Doctor</h3>
                <p className="text-text-secondary">{selectedSymptom.whenToSeeDoctor}</p>
              </div>
            </div>
          </div>
        ) : (
          // Grid of all symptoms
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {symptoms.map((symptom) => (
              <div
                key={symptom.id}
                onClick={() => setSelectedSymptom(symptom)}
                className="group relative overflow-hidden rounded-2xl 
                  bg-bg-primary/30 backdrop-blur-sm
                  border border-border/20 cursor-pointer
                  hover:border-primary/30 transition-all duration-500
                  hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative p-8 flex items-center space-x-6">
                  {/* Icon container */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 
                      flex items-center justify-center
                      group-hover:bg-primary/20 group-hover:scale-110 
                      transition-all duration-500">
                      <symptom.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-text-primary 
                      group-hover:text-primary transition-colors duration-500">
                      {symptom.name}
                    </h3>
                    <p className="mt-2 text-text-secondary line-clamp-2">
                      {symptom.description}
                    </p>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute right-6 opacity-0 group-hover:opacity-100 
                    translate-x-4 group-hover:translate-x-0
                    transition-all duration-500">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* back to home button */}
        

      </div>
    </div>
  );
};

export default SymptomDetails; 