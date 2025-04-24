import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const OrderStatusCard = ({ order, orderStatus, statuses, handleStatusChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex-1 space-y-6">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">{order.booking}</h3>
            <span className="text-sm text-black">By {order.lab.name}</span>
          </div>

          {/* Order Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center bg-primary text-white px-5 py-2 rounded-md text-sm"
            >
              {orderStatus || "Select Status"} 
              <FaChevronDown className="ml-2" />
            </button>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg py-2 w-36">
                {statuses.map((status) => (
                  <li
                    key={status}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => {
                      handleStatusChange(status); 
                      setIsDropdownOpen(false); 
                    }}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-4 font-bold text-xl">{order.price}</p> 

        <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md transition-all">
          Update Order Status
        </button>
      </div>
    </div>
  );
};

export default OrderStatusCard;
