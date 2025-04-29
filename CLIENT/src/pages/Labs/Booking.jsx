// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { labsData } from "./LabData";
// import { FaUsers, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";

// export const Booking = () => {
//   const { itemId } = useParams(); 
//   const navigate = useNavigate();
//   const [showFeedback, setShowFeedback] = useState(false);

//   // Find the item in lab data
//   let bookedItem = null;
//   let bookedLab = null;

//   labsData.forEach((lab) => {
//     const foundTest = lab.tests.find((test) => test.id === parseInt(itemId));
//     const foundPackage = lab.packages.find((pkg) => pkg.id === parseInt(itemId));

//     if (foundTest) {
//       bookedItem = foundTest;
//       bookedLab = lab;
//     }
//     if (foundPackage) {
//       bookedItem = foundPackage;
//       bookedLab = lab;
//     }
//   });

//   if (!bookedItem) {
//     return <p className="text-center text-red-500">Item not found</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto mt-32 space-y-6">
//       {/* Booked Test/Package Details */}
//       <div className="shadow-lg bg-white rounded-lg p-6">
//         <h2 className="text-xl font-bold text-gray-800">{bookedItem.name}</h2>
//         <p className="text-gray-600">{bookedItem.description}</p>

//         {/* Stats */}
//         <div className="flex justify-between items-center mt-4">
//           <div className="flex items-center gap-2 text-gray-700 font-medium">
//             <FaUsers className="text-primary" />
//             <span>{bookedItem.bookedCount || 0} Booked</span>
//           </div>
//           <div className="flex items-center gap-2 text-yellow-500 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-lg">
//             <FaStar /> {bookedItem.rating} ⭐
//           </div>
//         </div>

//         {/* Price & Book Now Button */}
//         <div className="mt-6 flex justify-between items-center">
//           <span className="text-lg font-semibold text-primary">${bookedItem.price}</span>
//           <button 
//             className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all"
//             onClick={() => navigate(`/booking-form/${itemId}`)}
//           >
//             Proceed to Booking
//           </button>
//         </div>
//       </div>

//       {/* User Feedback and Rating Section */}
//       <div className="shadow-lg bg-white rounded-lg p-6">
//         <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowFeedback(!showFeedback)}>
//           <h3 className="text-lg font-semibold">User Feedback & Ratings</h3>
//           {showFeedback ? <FaChevronUp /> : <FaChevronDown />}
//         </div>

//         {showFeedback && (
//           <div className="mt-4 space-y-4">
//             {/* Sample feedback data */}
//             {bookedItem.reviews && bookedItem.reviews.length > 0 ? (
//               bookedItem.reviews.map((review, index) => (
//                 <div key={index} className="p-4 border rounded-lg">
//                   <p className="text-gray-700">{review.comment}</p>
//                   <div className="flex items-center gap-1 text-yellow-500 mt-2">
//                     <FaStar />
//                     <span>{review.rating} ⭐</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No reviews yet.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
