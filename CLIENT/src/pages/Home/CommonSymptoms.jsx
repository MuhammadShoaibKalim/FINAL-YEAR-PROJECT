import { useNavigate } from 'react-router-dom';
import { 
  FaLungs, FaHeadSideCough, FaHeartbeat, FaTired, FaTemperatureHigh, FaStethoscope, FaArrowRight 
} from "react-icons/fa"; 

const MostAskedSymptoms = () => {
  const navigate = useNavigate();
  
  const commonSymptoms = [
    { name: "Fever", icon: FaTemperatureHigh, accent: "primary" },
    { name: "Cough", icon: FaHeadSideCough, accent: "secondary" },
    { name: "Headache", icon: FaHeartbeat, accent: "primary" },
    { name: "Fatigue", icon: FaTired, accent: "secondary" },
    { name: "Shortness of Breath", icon: FaLungs, accent: "primary" },
    { name: "Sore Throat", icon: FaStethoscope, accent: "secondary" }
  ];

  const handleViewAll = () => {
    navigate('/symptoms');
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-block px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Symptom Intelligence</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Common <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Health Symptoms.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl">
              Identify potential health concerns by exploring our extensive clinical database of common industrial and environmental symptoms.
            </p>
          </div>
          <button 
            onClick={handleViewAll}
            className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-2xl shadow-slate-200 flex items-center justify-center gap-4"
          >
            Symptom Directory
            <FaArrowRight className="text-[10px] group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {commonSymptoms.map((symptom, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/symptoms/${symptom.name.toLowerCase()}`)}
              className="group relative p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden text-center flex flex-col items-center gap-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
              
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl transition-all duration-500 shadow-sm ${symptom.accent === 'primary' ? 'bg-white text-primary border-primary/10 group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/20' : 'bg-white text-secondary border-secondary/10 group-hover:bg-secondary group-hover:text-white group-hover:shadow-secondary/20'}`}>
                <symptom.icon className="group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-base font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">
                {symptom.name}
              </h3>

              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <FaArrowRight className="text-primary text-[10px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostAskedSymptoms;
