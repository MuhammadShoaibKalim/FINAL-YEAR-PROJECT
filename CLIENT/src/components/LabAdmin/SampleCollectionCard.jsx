import React, { useState } from "react";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { Switch } from "@headlessui/react";

const SampleCollectionCard = ({ order }) => {
  const [sampleCollected, setSampleCollected] = useState(false);
  const [collectionType, setCollectionType] = useState("Home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    const submissionData = {
      sampleCollected,
      collectionType,
      orderDate: order?.orderDate || "Not specified",
    };

    console.log("Submitting:", submissionData);
    alert(`✅ Sample collection updated!\n\nType: ${collectionType}\nCollected: ${sampleCollected ? "Yes" : "No"}`);

    // Close dropdown after submitting
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded max-w-4xl mx-auto ">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4">
        {/* Left: Sample Collection Type */}
        <div>
          <h3 className="text-xl font-semibold text-black mb-4">Sample Collection Type</h3>
          <p className="text-lg font-medium text-black">{collectionType}</p>
        </div>

        {/* Right: Sample Collection Date */}
        <div className="text-right">
          <h3 className="text-lg font-semibold text-black mb-4">Sample Collection Date</h3>
          <p className="text-sm text-black flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            {order?.orderDate || "Not specified"}
          </p>
        </div>
      </div>

      {/* Sample Collected Toggle and Update Button */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-md font-medium text-black">Sample Collected:</p>
          <Switch
            checked={sampleCollected}
            onChange={setSampleCollected}
            className={`${sampleCollected ? "bg-primary" : "bg-white"} 
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                sampleCollected ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition-transform `}
            />
          </Switch>
        </div>

        {/* Update Sample Collection Type - With Submit Inside */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 shadow hover:shadow-lg transition-all"
          >
            Update Sample Collection Type
            <FaChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
              <ul className="py-2">
                {["Home", "Physical", "Drive-Thru", "Walk-In"].map((type) => (
                  <li
                    key={type}
                    onClick={() => setCollectionType(type)}
                    className={`px-4 py-2 text-gray-700 hover:bg-primary hover:text-white cursor-pointer ${
                      collectionType === type ? "bg-primary text-white" : ""
                    }`}
                  >
                    {type}
                  </li>
                ))}
              </ul>

              {/* Submit Button Inside Dropdown */}
              <button
                onClick={handleSubmit}
                className="w-full bg-primary text-white py-2 rounded-b-md transition-all "
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleCollectionCard;
