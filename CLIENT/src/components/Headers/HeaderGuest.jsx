// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
// import logo from "../../assets/logo.png";

// const HeaderGuest = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'AI Recommendation', path: '/ai-recommendations-test' },
//     { name: 'Labs', path: '/labs' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact Us', path: '/contact' },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//         <Link to="/" onClick={scrollToTop} className="flex items-center">
//         <img
//   src={logo}
//   alt="TestSahulat Logo"
//   className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-full"
// />

// </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 onClick={scrollToTop}
//                 className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium px-3 py-2 text-sm rounded-md hover:bg-gray-50"
//               >
//                 {link.name}
//               </Link>
//             ))}

//             <Link
//               to="/login"
//               className="bg-primary text-white hover:bg-primary/90 transition-colors duration-200 font-medium px-6 py-2 text-sm rounded-md flex items-center gap-2"
//             >
//               <FaSignInAlt />
//               <span>Login / Sign Up</span>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-primary transition-colors duration-200"
//             >
//               {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   onClick={() => {
//                     setIsOpen(false);
//                     scrollToTop();
//                   }}
//                   className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
//                 >
//                   {link.name}
//                 </Link>
//               ))}

//               <div className="pt-4 pb-3 border-t border-gray-200">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200 font-medium px-6 py-2 text-sm rounded-md flex items-center gap-2 justify-center"
//                 >
//                   <FaSignInAlt />
//                   <span>Login / Sign Up</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default HeaderGuest;
