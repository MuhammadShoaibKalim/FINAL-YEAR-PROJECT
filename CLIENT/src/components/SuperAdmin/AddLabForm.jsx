import React, { useState, useEffect } from 'react';

const AddLabForm = ({ toggleAddLab, addLab, editLab, editLabDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
    description: '',
    isActive: true,
    assignedAdmin: '',
    image: null,
    type: '',
  });
  

  const [imagePreview, setImagePreview] = useState(null);
  const [labAdmins, setLabAdmins] = useState([]);

 
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/superadmin/labadmins", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        setLabAdmins(data.labAdmins || []);
      } catch (err) {
        console.error("Failed to fetch lab admins", err);
      }
    };
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (editLab) {
      setFormData({
        name: editLab.name || '',
        address: editLab.address || '',
        location: editLab.location || '',
        description: editLab.description || '',
        isActive: editLab.isActive ?? true,
        assignedAdmin: editLab.labAdmin || '',
        image: null,
      });
      setImagePreview(editLab.image || null);
    }
  }, [editLab]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formToSend = new FormData();
    formToSend.append("name", formData.name);
    formToSend.append("address", formData.address);
    formToSend.append("location", formData.location);
    formToSend.append("description", formData.description);
    formToSend.append("isActive", formData.isActive ? "true" : "false");
    formToSend.append("assignedAdmin", formData.assignedAdmin);
    formToSend.append("type", formData.type);
  
    formToSend.append("uploadFolder", "labs");
  
    if (formData.image) {
      formToSend.append("image", formData.image);
    }
  
    if (editLab) {
      editLabDetails({ ...editLab, ...formData });
    } else {
      addLab(formToSend);
    }
  
    toggleAddLab();
  };
  

  return (
    <div className="rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">{editLab ? 'Edit Lab' : 'Add New Lab'}</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Lab Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Lab Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" required />
        </div>

        {/* Lab Type */}
<div className="mb-4">
  <label className="block text-sm font-medium">Lab Type</label>
  <select
    name="type"
    value={formData.type || ""}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-md"
    required
  >
    <option value="">Select Type</option>
    <option value="Lab">Lab</option>
    <option value="Hospital">Hospital</option>
  </select>
</div>

        {/* Lab Admin Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Assign Lab Admin</label>
          <select name="assignedAdmin" value={formData.assignedAdmin} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" required>
            <option value="">Select Lab Admin</option>
            {labAdmins.map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.firstName} {admin.lastName} ({admin.email})
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Lab Image</label>
          <input type="file" accept="image/*" name="image" onChange={handleChange}
            className="w-full" />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded border" />
          )}
        </div>

        {/* Status */}
        <div className="mb-4 flex items-center gap-2">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}
            className="w-4 h-4" />
          <label className="text-sm text-gray-700">Mark as Active</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={toggleAddLab}>Cancel</button>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
            {editLab ? 'Save Changes' : 'Add Lab'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLabForm;
