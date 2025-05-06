const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs md:text-sm relative overflow-hidden z-50">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[50px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[50px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-end h-12 space-x-2">
          <div className="flex items-center space-x-1 border-l border-white/20 pl-2">
            <a href="/about" className="hover:text-white/80 font-medium transition-colors">About Us</a>
            <span className="text-white/30">|</span>
            <a href="/contact" className="hover:text-white/80 font-medium transition-colors">Support</a>
            <span className="text-white/30">|</span>
            <a href="/join" target="_blank" className="hover:text-white/80 font-medium transition-colors">Join Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
