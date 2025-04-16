import React, { useState } from 'react';
import AddLabForm from './AddLabForm';

const initialLabData = [
  {
    id: '654806c16b6b48095b3aaa',
    name: 'CTI Lab',
    address: '123 Science St, Cityville',
    location: 'Building A',
    image: 'https://via.placeholder.com/150',
    isActive: true,
  },
  {
    id: '554806c16b6b48095b3bbb',
    name: 'Physics Lab',
    address: '456 Innovation Rd, Tech City',
    location: 'Building B',
    image: 'https://via.placeholder.com/150',
    isActive: false,
  },
  {
    id: '554806c16b6b48095b3ccc',
    name: 'Chemistry Lab',
    address: '789 Discovery Ave, Labtown',
    location: 'Building C',
    image: 'https://via.placeholder.com/150',
    isActive: true,
  },
];

const Labs = () => {
  const [labData, setLabData] = useState(initialLabData);
  const [isAddingLab, setIsAddingLab] = useState(false);
  const [editLab, setEditLab] = useState(null);

  const toggleAddLab = () => {
    setIsAddingLab(!isAddingLab);
    setEditLab(null);
  };

  const addLab = (newLab) => {
    setLabData([...labData, { ...newLab, id: Date.now().toString() }]);
    setIsAddingLab(false);
  };

  const editLabDetails = (updatedLab) => {
    const updatedLabData = labData.map((lab) =>
      lab.id === updatedLab.id ? updatedLab : lab
    );
    setLabData(updatedLabData);
    setIsAddingLab(false);
    setEditLab(null);
  };

  const deleteLab = (labId) => {
    const updatedLabData = labData.filter((lab) => lab.id !== labId);
    setLabData(updatedLabData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-8xl">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0">Labs</h2>
          {!isAddingLab && !editLab && (
            <button
              onClick={toggleAddLab}
              className="bg-primary text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Add New Lab
            </button>
          )}
        </div>
        <p className="text-black mb-4 text-center md:text-left">
          Manage all your existing labs or add a new one
        </p>
      </div>

      {(isAddingLab || editLab) ? (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{editLab ? 'Edit Lab' : 'Add New Lab'}</h3>
            <button
              onClick={toggleAddLab}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Close
            </button>
          </div>
          <AddLabForm
            toggleAddLab={toggleAddLab}
            addLab={addLab}
            editLab={editLab}
            editLabDetails={editLabDetails}
          />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {labData.map((lab) => (
              <div key={lab.id} className="bg-white shadow-md rounded-lg p-6">
                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-center md:text-left">{lab.name}</h3>
                <p className="text-gray-600 mt-2 text-center md:text-left">{lab.address}</p>
                <p className="text-gray-500 text-sm text-center md:text-left">{lab.location}</p>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
                  <button
                    className={`text-sm px-4 py-2 rounded-lg w-full md:w-auto ${
                      lab.isActive ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {lab.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex space-x-2">
                    <button
                      className="bg-primary text-white px-3 py-1 rounded-lg"
                      onClick={() => {
                        setEditLab(lab);
                        setIsAddingLab(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-primary text-white px-3 py-1 rounded-lg"
                      onClick={() => deleteLab(lab.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Labs;
