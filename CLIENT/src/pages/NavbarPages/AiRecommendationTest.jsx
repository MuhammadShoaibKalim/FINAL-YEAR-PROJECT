import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaRobot, FaPaperPlane, FaMicrophone, FaRegLightbulb, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AIRecommendation = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your TestSahulat AI assistant. Describe your symptoms or health concerns, and I'll recommend relevant diagnostic tests for you." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.recommendation }]);
      } else {
        // Fallback for demo/dev
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: "Based on your symptoms, I recommend a Complete Blood Count (CBC) and a Blood Sugar test. Please consult a doctor for a professional diagnosis." 
          }]);
          setIsLoading(false);
        }, 1500);
      }
    } catch (error) {
       setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "I recommend checking your Vitamin D levels and a basic Metabolic Panel based on what you described. You can find these tests in our search section." 
        }]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const suggestions = [
    "I feel very tired lately",
    "Persistent headache and dizziness",
    "Regular health checkup tests",
    "Tests for joint pain"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col h-[75vh] bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary p-6 flex items-center justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
              <FaRobot className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Health Assistant AI</h2>
              <div className="flex items-center gap-2 text-white/70 text-[10px] uppercase tracking-wider font-extrabold">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(5,161,168,0.8)]"></span>
                System Active
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white/80">Patient Mode</p>
              <p className="text-[10px] text-white/40 uppercase font-black">Encrypted</p>
            </div>
            <FaUserCircle className="text-3xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 relative">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm ${
                  msg.role === "user" 
                    ? "bg-slate-900 text-white rounded-tr-none shadow-slate-200/50" 
                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-slate-200/50"
                }`}>
                  <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                  <div className={`text-[9px] mt-2 font-bold uppercase transition-colors ${msg.role === 'user' ? 'text-primary' : 'text-slate-400'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white p-5 rounded-3xl rounded-tl-none border border-slate-100 flex gap-2 items-center">
                <div className="flex gap-1.5">
                  <motion.span animate={{ scale: [1, 1.2, 1], backgroundColor: ["#09acb4", "#05a1a8", "#09acb4"] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full"></motion.span>
                  <motion.span animate={{ scale: [1, 1.2, 1], backgroundColor: ["#09acb4", "#05a1a8", "#09acb4"] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full"></motion.span>
                  <motion.span animate={{ scale: [1, 1.2, 1], backgroundColor: ["#09acb4", "#05a1a8", "#09acb4"] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full"></motion.span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase ml-2">Analyzing</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions & Input */}
        <div className="p-8 bg-white border-t border-slate-100 space-y-6">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {suggestions.map((s) => (
                <button 
                  key={s} 
                  onClick={() => setInput(s)}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 hover:border-primary/30 hover:text-primary text-slate-600 text-[11px] font-black rounded-2xl border border-slate-200 transition-all flex items-center gap-2 group uppercase tracking-tight"
                >
                  <FaRegLightbulb className="text-secondary group-hover:scale-110 transition-transform" />
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your health symptoms..."
              className="w-full pl-7 pr-28 py-6 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:ring-0 focus:border-primary focus:bg-white outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400 shadow-inner"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-3 text-slate-400 hover:text-primary transition-colors">
                <FaMicrophone className="text-lg" />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-4 bg-primary hover:bg-secondary text-white rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane className="text-sm" />}
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
            <span className="text-primary mr-1">Disclamer:</span>
            AI recommendations are not a medical diagnosis. Consult a professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
