import React, { useState, useEffect } from 'react';

const AddLabForm = ({ toggleAddLab, addLab, editLab, editLabDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
    isActive: true,
  });

  useEffect(() => {
    if (editLab) {
      setFormData({
        name: editLab.name,
        address: editLab.address,
        location: editLab.location,
        isActive: editLab.isActive,
      });
    }
  }, [editLab]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editLab) {
      // Edit existing lab
      editLabDetails({ ...editLab, ...formData });
    } else {
      addLab(formData);
    }
    toggleAddLab(); 
  };

  return (
    <div className=" rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">
        {editLab ? 'Edit Lab' : 'Add New Lab'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium py-3">Lab Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray rounded-md outline-none"
            placeholder="Enter lab name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium py-3">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray rounded-md outline-none"
            placeholder="Enter lab address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium py-3">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray rounded-md outline-none"
            placeholder="Enter lab location"
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={toggleAddLab} 
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-md"
          >
            {editLab ? 'Save Changes' : 'Add Lab'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLabForm;
