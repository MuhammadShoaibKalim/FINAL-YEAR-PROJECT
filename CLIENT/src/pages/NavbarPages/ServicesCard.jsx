import React from "react";
import { FaStar, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const ServiceCard = ({ title, rating, price, description, viewCount, onViewDetails, type }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between text-sm text-black">
        <span className="flex items-center">
          <FaEye className="text-black mr-1" /> Booked {viewCount}
        </span>
        <div className="flex">
          {rating !== "N/A" ? (
            <div className="flex text-yellow-500">
              <FaStar />
              <span className="ml-2">{rating}</span>
            </div>
          ) : (
            <span className="text-gray-500"></span>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
      </div>
      <p className="text-lg font-medium text-black mt-2">{price ? `Rs ${price}` : "Price on request"}</p>

      <div className="flex justify-between mt-4">
        {/* View Details Button */}
        <button
          onClick={() => onViewDetails({ title, price, description, rating, viewCount })}
          className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white"
        >
          View Details
        </button>

        <Link to={type === "package" 
  ? `/booking/package/${encodeURIComponent(title)}` 
  : `/booking/test/${encodeURIComponent(title)}`}>
  <button className="flex items-center justify-center bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition">
    Book Now <AiOutlineArrowRight className="ml-2" />
  </button>
</Link>


      </div>
    </div>
  );
};

export default ServiceCard;
