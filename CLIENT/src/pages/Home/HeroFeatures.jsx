import { FiActivity, FiShield, FiUserCheck, FiServer } from "react-icons/fi"; 
import { FaFlask, FaRobot, FaCalendarCheck, FaLayerGroup } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: FaRobot,
      title: "AI-Powered Analysis",
      description: "Next-gen health insights using predictive modeling technology",
      accent: "primary"
    },
    {
      icon: FaFlask,
      title: "Laboratory Network",
      description: "Direct connectivity to 50+ ISO-certified diagnostic centers",
      accent: "secondary"
    },
    {
      icon: FiShield,
      title: "Data Sovereignty",
      description: "Patient records protected with military-grade encryption protocols",
      accent: "primary"
    },
    {
      icon: FaLayerGroup,
      title: "Centralized Records",
      description: "Unified access to clinical history, pricing, and instructions",
      accent: "secondary"
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary leading-none">Technological Excellence</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Healthcare.</span></h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            TestSahulat integrates advanced technology with clinical precision to deliver a superior diagnostic experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/5 transition-colors"></div>
              
              <div className="relative z-10 space-y-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 shadow-lg ${feature.accent === 'primary' ? 'bg-primary text-white shadow-primary/20 group-hover:bg-slate-900' : 'bg-secondary text-white shadow-secondary/20 group-hover:bg-slate-900'}`}>
                  <feature.icon className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-10 h-1 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
