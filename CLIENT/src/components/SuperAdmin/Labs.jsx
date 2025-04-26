import React, { useEffect, useState } from 'react';
import AddLabForm from './AddLabForm';
import toast from 'react-hot-toast';

const Labs = () => {
  const [labData, setLabData] = useState([]);
  const [isAddingLab, setIsAddingLab] = useState(false);
  const [editLab, setEditLab] = useState(null);

  const fetchLabs = async () => {
    try {
      const res = await fetch("/api/labs/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.labs)) {
        setLabData(data.labs);
      }
    } catch (error) {
      console.error("Failed to fetch labs", error);
    }
  };

  useEffect(() => {
    fetchLabs(); 
  }, []);

  const addLab = async (formData) => {
    try {
      const res = await fetch("/api/labs/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Lab created successfully");
        setIsAddingLab(false);
        fetchLabs();            
      } else {
        toast.error(data.message || "Failed to create lab");
      }
    } catch (err) {
      toast.error("Server error while creating lab");
    }
  };

  // const editLabDetails = (updatedLab) => {
  //   const updatedLabData = labData.map((lab) =>
  //     lab.id === updatedLab.id ? updatedLab : lab
  //   );
  //   setLabData(updatedLabData);
  //   setIsAddingLab(false);
  //   setEditLab(null);
  // };
  const editLabDetails = async (updatedLab) => {
    try {
      const formToSend = new FormData();
      formToSend.append("name", updatedLab.name);
      formToSend.append("address", updatedLab.address);
      formToSend.append("location", updatedLab.location);
      formToSend.append("description", updatedLab.description);
      formToSend.append("isActive", updatedLab.isActive);
      formToSend.append("assignedAdmin", updatedLab.assignedAdmin);
      formToSend.append("type", updatedLab.type);
      formToSend.append("uploadFolder", "labs");
  
      if (updatedLab.image) {
        formToSend.append("image", updatedLab.image);
      }
  
      const res = await fetch(`/api/labs/${updatedLab._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formToSend,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Lab updated successfully");
        fetchLabs();
        setIsAddingLab(false);
        setEditLab(null);
      } else {
        toast.error(data.message || "Failed to update lab");
      }
    } catch (error) {
      console.error("Update lab error:", error);
      toast.error("Error updating lab");
    }
  };
  
  

  // const deleteLab = (labId) => {
  //   const updatedLabData = labData.filter((lab) => lab._id !== labId);
  //   setLabData(updatedLabData);
  // };
  const deleteLab = async (labId) => {
    try {
      const res = await fetch(`/api/labs/${labId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Lab deleted successfully");
        fetchLabs(); 
      } else {
        toast.error(data.message || "Failed to delete lab");
      }
    } catch (error) {
      toast.error("Error deleting lab");
    }
  };
  
  

  const toggleAddLab = () => {
    setIsAddingLab(!isAddingLab);
    setEditLab(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-7xl">
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
              <div key={lab._id} className="bg-white shadow-md rounded-lg p-6">
                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-center md:text-left">{lab.name}</h3>
                <p className="text-gray-600 mt-2 text-center md:text-left">{lab.address}</p>
                <p className="text-gray-500 text-sm text-center md:text-left">{lab.location}</p>
                {lab.labAdmin && (<p className="text-sm text-gray-600 text-center md:text-left"> 
                Assigned Admin: {lab.labAdmin.firstName} {lab.labAdmin.lastName}</p>)}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
                  <button
                    className={`text-sm px-4 py-2 rounded-lg w-full md:w-auto ${lab.isActive ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'}`}
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
                      onClick={() => deleteLab(lab._id)}
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
