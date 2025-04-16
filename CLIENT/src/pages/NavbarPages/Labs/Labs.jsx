import { useState } from "react";
import { labsData } from "./LabData";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaCheckCircle, FaMicroscope, FaDollarSign, FaQuestionCircle, FaClock } from "react-icons/fa";
import { FaTruckMedical } from "react-icons/fa6";

Modal.setAppElement("#root");

export default function LabTestBooking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const { labId } = useParams();
  const navigate = useNavigate();
  const [selectedLab, setSelectedLab] = useState(null);

  const filteredLabs = labsData.filter((lab) => {
    const query = searchQuery.toLowerCase();
    return (
      [lab.name, lab.location, lab.address].some((field) =>
        field.toLowerCase().includes(query)
      ) ||
      lab.tests.some((test) =>
        [test.name, test.description, test.type].some((field) =>
          field?.toLowerCase().includes(query)
        )
      ) ||
      lab.packages.some((pkg) =>
        [pkg.name, pkg.description, pkg.type].some((field) =>
          field?.toLowerCase().includes(query)
        )
      )
    );
  });

  const sortedLabs = [...filteredLabs].sort((a, b) =>
    sortOption === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto mt-32">
      <div className="bg-white p-6 rounded-lg shadow-md text">
        <h2 className="text-3xl font-bold">
          Best Radiology & Pathology Labs
        </h2>
        <p className="text-gray-600 mt-2">
          Find and compare lab tests at the best available prices.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search for a lab..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-3 rounded w-full md:w-2/3 outline-none shadow-sm"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 outline-none shadow-sm"
        >
          <option value="rating">Sort by Rating</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {sortedLabs.length > 0 ? (
          sortedLabs.map((lab) => (
            <div
              key={lab.id}
              className="relative p-6 border rounded-xl shadow-lg bg-white flex flex-col md:flex-row gap-6 items-center transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-md shadow-md z-10">
                ⭐ {lab.rating}
              </div>
              <div className="w-full md:w-1/3 h-48 overflow-hidden relative rounded-md">
                <div className="absolute top-0 left-0 right-0 bg-primary bg-opacity-100 text-white text-lg font-bold text-center py-2">
                  {lab.name}
                </div>

                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

           
              <div className="absolute bottom-4 right-4 flex gap-3">
                <button
                  onClick={() => setSelectedLab(lab)}
                  className="border border-primary text-primary px-4 py-2 rounded-lg shadow-md hover:bg-primary hover:text-white transition-all"
                >
                  About Us
                </button>
                <button
                  onClick={() => navigate(`/labs/${lab.id}`)}
                  className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all"
                >
                  Tests & Packages
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No labs found.</p>
        )}
      </div>

      <Modal
        isOpen={selectedLab !== null}
        onRequestClose={() => setSelectedLab(null)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 shadow-lg max-w-4xl w-full rounded-lg relative">
          {selectedLab && (
            <div className="flex flex-col lg:flex-row gap-6 relative">
              <button
                className="absolute top- right-4 text-gray-600 hover:text-red-500 text-xl"
                onClick={() => setSelectedLab(null)}
              >
                <FaTimes />
              </button>

              <div className="w-full lg:w-1/3">
                <img
                  src={selectedLab.image}
                  alt={selectedLab.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{selectedLab.name}</h2>
                  <div className="text-lg mt-4">{selectedLab.description}</div>
                </div>

                <div className="mt-4 flex items-center text-gray-600 space-x-2">
                  <CiLocationOn className="w-5 h-5 text-red-500" />
                  <div className="text-md text-gray-500">
                    {selectedLab.address}
                  </div>
                  <span className="text-md">{selectedLab.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
  
<div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us? </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="p-4 bg-white rounded-lg shadow flex items-start gap-3">
      <FaCheckCircle className="text-primary text-2xl" />
      <div>
        <h3 className="font-semibold text-lg">Certified Labs</h3>
        <p className="text-gray-600 mt-2">We partner with top-rated and government-approved labs.</p>
      </div>
    </div>
    <div className="p-4 bg-white rounded-lg shadow flex items-start gap-3">
      <FaMicroscope className="text-primary text-2xl" />
      <div>
        <h3 className="font-semibold text-lg">Accurate Reports</h3>
        <p className="text-gray-600 mt-2">Our labs use advanced technology to provide 100% accurate reports.</p>
      </div>
    </div>
    <div className="p-4 bg-white rounded-lg shadow flex items-start gap-3">
      <FaDollarSign className="text-primary text-2xl" />
      <div>
        <h3 className="font-semibold text-lg">Affordable Prices</h3>
        <p className="text-gray-600 mt-2">Compare lab prices and book tests at the best rates available.</p>
      </div>
    </div>
  </div>
</div>

<div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions (FAQs) </h2>
  <div className="divide-y divide-gray-300">
    <div className="py-4 flex items-start gap-3">
      <FaQuestionCircle className="text-primary text-xl mt-1" />
      <div>
        <h3 className="font-semibold">How do I book a lab test?</h3>
        <p className="text-gray-600 mt-2">Simply search for a test, select a lab, and follow the booking instructions.</p>
      </div>
    </div>
    <div className="py-4 flex items-start gap-3">
      <FaClock className="text-primary text-xl mt-1" />
      <div>
        <h3 className="font-semibold">How long does it take to get results?</h3>
        <p className="text-gray-600 mt-2">Results are typically available within 24-48 hours depending on the test.</p>
      </div>
    </div>
    <div className="py-4 flex items-start gap-3">
      <FaTruckMedical className="text-primary text-xl mt-1" />
      <div>
        <h3 className="font-semibold">Do you offer home sample collection?</h3>
        <p className="text-gray-600 mt-2">Yes, some labs offer home collection services. Check lab details for availability.</p>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}
