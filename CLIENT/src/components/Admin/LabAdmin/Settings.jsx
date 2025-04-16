import React, { useState } from "react";
import { FaUser, FaFlask } from "react-icons/fa";
import { MdLocationOn, MdOutlineCheckCircle, MdCancel } from "react-icons/md";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [labData, setLabData] = useState({
    adminName: "John Doe",
    email: "admin@lab.com",
    phone: "+123 456 7890",
    labName: "Prime Diagnostics",
    location: "Lahore, Pakistan",
    address: "123 Main Street, DHA, Lahore",
    isActive: true,
    profileImage: "https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?w=500&auto=format&fit=crop&q=60",
    labImage: "https://plus.unsplash.com/premium_photo-1661308307351-46de448bd3bf?w=500&auto=format&fit=crop&q=60",
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (e) => {
    setLabData({ ...labData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLabData({ ...labData, [field]: imageUrl });
    }
  };

  const toggleActiveStatus = () => {
    setLabData({ ...labData, isActive: !labData.isActive });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-12 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center md:w-1/3">
        <label>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'profileImage')} />
          <img
            src={labData.profileImage}
            alt="Admin"
            className="w-32 h-32 rounded-full shadow-md border-4 border-primary object-cover cursor-pointer"
          />
        </label>
        <div className="text-center mt-4">
          {isEditing ? (
            <input type="text" name="adminName" value={labData.adminName} onChange={handleChange} className="border p-2 rounded w-full text-center" />
          ) : (
            <h3 className="text-2xl font-semibold">{labData.adminName}</h3>
          )}
          <p className="text-gray-500">Lab Admin</p>
          <p className="text-gray-700 mt-2">
            <strong>Email:</strong> {isEditing ? <input type="email" name="email" value={labData.email} onChange={handleChange} className="border p-2 rounded w-full" /> : labData.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {isEditing ? <input type="text" name="phone" value={labData.phone} onChange={handleChange} className="border p-2 rounded w-full" /> : labData.phone}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md flex-1">
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <input type="text" name="labName" value={labData.labName} onChange={handleChange} className="border p-2 rounded w-full" />
          ) : (
            <h3 className="text-2xl font-semibold">{labData.labName}</h3>
          )}
          <button onClick={toggleActiveStatus} className={`text-lg font-medium flex items-center gap-1 ${labData.isActive ? "text-green-600" : "text-red-500"}`}>
            {labData.isActive ? (
              <><MdOutlineCheckCircle className="text-green-600" /> Active</>
            ) : (
              <><MdCancel className="text-red-500" /> Inactive</>
            )}
          </button>
        </div>

        <label>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'labImage')} />
          <img src={labData.labImage} alt="Lab" className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md cursor-pointer" />
        </label>

        <div className="mt-4 space-y-2">
          <p className="text-gray-600 flex items-center gap-1">
            <MdLocationOn className="text-primary" />
            {isEditing ? <input type="text" name="location" value={labData.location} onChange={handleChange} className="border p-2 rounded w-full" /> : labData.location}
          </p>
          <p className="text-gray-700">
            {isEditing ? <input type="text" name="address" value={labData.address} onChange={handleChange} className="border p-2 rounded w-full" /> : labData.address}
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          {isEditing ? (
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          ) : (
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
          )}
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
