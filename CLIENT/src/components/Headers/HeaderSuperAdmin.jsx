// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Logout } from "../../redux/AuthSlice"; // Correct path based on your project
// import toast from "react-hot-toast";
// import { LogOut, LayoutDashboard } from "lucide-react";

// const HeaderSuperAdmin = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     dispatch(Logout());
//     toast.success("Logged out successfully");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <h1 className="text-xl md:text-2xl font-bold text-primary">
//           Super Admin Dashboard
//         </h1>

//         <div className="flex items-center gap-4">
//         <Link
//   to="/admin/super/overview"
//   className="flex items-center gap-2 bg-gray-100 text-primary font-medium px-4 py-2 rounded hover:bg-gray-200 transition"
// >
//   <LayoutDashboard size={18} />
//   Go to Dashboard
// </Link>


//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default HeaderSuperAdmin;
