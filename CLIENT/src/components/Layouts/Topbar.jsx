import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Topbar = () => {
  // Get the total quantity of items from Redux
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs md:text-sm relative overflow-hidden z-50">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[50px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[50px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-end h-12 space-x-4">
          <div className="flex items-center space-x-4 border-l border-white/20 pl-4">
            <a href="/about" className="hover:text-white/80 font-medium transition-colors">About Us</a>
            <span className="text-white/30">|</span>
            <a href="/contact" className="hover:text-white/80 font-medium transition-colors">Contact Us</a>
            <span className="text-white/30">|</span>

            <a href="/user/cart" className="relative flex items-center hover:text-white/80 font-medium transition-colors">
              <FaShoppingCart className="mr-1" size={16} />
              Cart
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold animate-bounce">
                  {totalQuantity}
                </span>
              )}
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
