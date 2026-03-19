import React, { useState, useRef, useEffect } from 'react';
import { X, Eraser, ClipboardList, TestTube2, ChevronRight, Clock, FlaskConical, CalendarDays, CheckCircle, Info, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

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

const AIRecommendation = () => {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [details, setDetails] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setError('');
  };

  const getRecommendations = async () => {
    if (selectedSymptoms.length === 0 && !details.trim()) {
      setError('Please select at least one symptom or provide details.');
      return;
    }

    setLoading(true);
    setError('');
    setShowResults(false);

    try {
      const response = await axios.post('/api/get-recommendation/recommend-tests', {
        description: details,
        symptoms: selectedSymptoms
      });

      const data = response.data;
      
      if (data.recommendedTests?.length > 0 || data.recommendations?.length > 0) {
        const enhancedTests = (data.recommendedTests || data.recommendations).map(test => ({
          ...test,
          accuracy: test.accuracy || 'High (90-95%)',
          turnaround: test.turnaround || '1-3 business days',
          preparation: test.preparation || 'Standard preparation',
          sample: test.sample || 'Blood sample'
        }));
        
        setRecommendations(enhancedTests);
        setShowResults(true);
      } else {
        setError('No specific tests recommended. Please consult a doctor.');
      }
    } catch (error) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden pb-20">
      {/* Ambient Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -mr-80 -mt-80 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -ml-64 -mb-64 opacity-40"></div>

      <div className="max-w-6xl mx-auto px-6 pt-16 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm"
          >
            <Sparkles size={14} className="text-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">Diagnostic Analysis Agent</p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tighter italic leading-none text-slate-900"
          >
            Smart Test <span className="text-primary NOT-italic tracking-normal">Selection.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-sm font-bold tracking-tight"
          >
            Describe your condition below for an AI-powered diagnostic recommendation.
          </motion.p>
        </div>

        {/* Vertical Layout: Chat-like Input on Top */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-[3rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 space-y-8 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 relative z-10">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-primary text-xl">
                <MessageSquare size={18} />
              </div>
              <h3 className="text-lg font-black italic tracking-tighter text-slate-900 uppercase">Describe Symptoms</h3>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] pl-1">Symptom Summary</label>
                <textarea
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="Selected symptoms will be logged here..."
                  className="w-full h-24 bg-slate-50 border border-slate-200 p-6 rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all resize-none shadow-inner"
                  readOnly
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] pl-1">Detailed Analysis Context</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Share details about duration, severity, and any other relevant observations..."
                  className="w-full h-44 bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] text-[12px] font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-primary/50 focus:bg-white transition-all resize-none shadow-inner leading-relaxed"
                />
              </div>
            </div>
          </motion.div>

          {/* Suggestions Below */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between px-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Fast-Select Parameters</p>
              {selectedSymptoms.length > 0 && (
                <button 
                  onClick={() => setSelectedSymptoms([])}
                  className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Selected Chips */}
            <AnimatePresence>
              {selectedSymptoms.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 px-2"
                >
                  {selectedSymptoms.map(symptom => (
                    <motion.div 
                      key={symptom}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest"
                    >
                      {symptom}
                      <X size={12} className="cursor-pointer hover:text-white" onClick={() => removeSymptom(symptom)} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rows of Suggestions */}
            <div className="space-y-3">
              {symptomRows.map((row, idx) => (
                <div key={idx} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                  {row.map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomClick(symptom)}
                      className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-primary/50 hover:text-primary'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 items-center"
          >
            {error && (
              <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
                <Info size={14} /> {error}
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <button
                onClick={getRecommendations}
                disabled={loading}
                className="flex-1 bg-slate-900 hover:bg-primary text-white py-6 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "Run Diagnostic Analysis"}
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              { (selectedSymptoms.length > 0 || details) && (
                <button
                  onClick={clearAll}
                  className="px-10 py-6 rounded-[2rem] border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Results Section Below Everything */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 space-y-10"
            >
              <div className="flex items-center gap-6 px-4">
                <h2 className="text-3xl font-black italic tracking-tighter">Recommended <span className="text-primary NOT-italic tracking-normal">Tests.</span></h2>
                <div className="h-[1px] flex-1 bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.map((test, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">CODE: {test.code || 'DIAG-AUTO'}</p>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight italic group-hover:text-primary transition-colors">{test.name || test.test}</h3>
                        </div>
                        <CheckCircle className="text-emerald-500" size={24} />
                      </div>
                      
                      <p className="text-slate-500 text-[11px] font-bold leading-relaxed opacity-80 italic">
                        {test.description || test.reason}
                      </p>

                      <div className="grid grid-cols-2 gap-y-6 pt-4">
                        {[
                          { icon: <Clock className="text-primary" />, label: 'Wait Time', value: test.turnaround },
                          { icon: <FlaskConical className="text-secondary" />, label: 'Specimen', value: test.sample }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <div className="text-sm">{item.icon}</div>
                            <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 leading-none">{item.label}</p>
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-8 border-t border-slate-50 mt-4">
                         <Link to="/labs" className="inline-flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-[0.3em] hover:text-slate-900 transition-all">
                            Find Available Labs <ChevronRight size={14} />
                         </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-slate-900 p-10 rounded-[3rem] text-center space-y-6">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Inventory Access</p>
                 <h4 className="text-2xl font-black text-white italic tracking-tighter">View all clinical tests and screening packages</h4>
                 <Link to="/all-tests-packages" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl">
                    Open Lab Catalog <ChevronRight />
                 </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIRecommendation;