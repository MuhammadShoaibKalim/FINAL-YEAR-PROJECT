import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPhoneAlt, FaFlask, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineCheckCircle, MdCancel } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const LabAdminProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingLab, setEditingLab] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [labForm, setLabForm] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [labImagePreview, setLabImagePreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resProfile = await fetch("/api/labadmin/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      const dataProfile = await resProfile.json();
      if (dataProfile.success) {
        setProfile(dataProfile.labAdmin);
        setProfileForm({
          firstName: dataProfile.labAdmin.firstName || "",
          lastName: dataProfile.labAdmin.lastName || "",
          phoneNo: dataProfile.labAdmin.phoneNo || "",
          email: dataProfile.labAdmin.email || "",
        });
        setProfileImagePreview(dataProfile.labAdmin.image || "");
      }

      const resLab = await fetch("/api/labadmin/lab", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      const dataLab = await resLab.json();
      if (dataLab.success) {
        setLab(dataLab.lab);
        setLabForm({
          name: dataLab.lab.name || "",
          location: dataLab.lab.location || "",
          address: dataLab.lab.address || "",
          isActive: dataLab.lab.isActive ?? true,
        });
        setLabImagePreview(dataLab.lab.image || "");
      }
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-bg-primary p-8 rounded-lg shadow-primary mt-10 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary">Welcome to Lab Admin Profile Settings</h2>
          <p className="text.text-secondary">Manage your personal and lab details from here.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab("profile")} className={`px-4 py-2 rounded-md font-semibold ${activeTab === "profile" ? "bg-primary text-white" : "bg.gray.light text.text-dark"}`}>Profile</button>
          <button onClick={() => setActiveTab("lab")} className={`px-4 py-2 rounded-md font-semibold ${activeTab === "lab" ? "bg-primary text-white" : "bg.gray.light text.text-dark"}`}>Lab</button>
        </div>
      </div>

      {activeTab === "profile" ? (
        <ProfileSection
          profile={profile}
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          profileImagePreview={profileImagePreview}
          setProfileImagePreview={setProfileImagePreview}
          editing={editingProfile}
          setEditing={setEditingProfile}
          fetchData={fetchData}
        />
      ) : (
        <LabSection
          lab={lab}
          labForm={labForm}
          setLabForm={setLabForm}
          labImagePreview={labImagePreview}
          setLabImagePreview={setLabImagePreview}
          editing={editingLab}
          setEditing={setEditingLab}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

const ProfileSection = ({ profile, profileForm, setProfileForm, profileImagePreview, setProfileImagePreview, editing, setEditing, fetchData }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setProfileImagePreview(URL.createObjectURL(files[0]));
      setProfileForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateProfile = async () => {
    const formData = new FormData();
    
    // Add all form fields
    formData.append('firstName', profileForm.firstName);
    formData.append('lastName', profileForm.lastName);
    formData.append('email', profileForm.email);
    formData.append('phoneNo', profileForm.phoneNo);
    
    // Add image if it exists and is a File object
    if (profileForm.profileImage instanceof File) {
      formData.append('profileImage', profileForm.profileImage);
    }

    try {
      const res = await fetch("/api/labadmin/profile", {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully!");
        fetchData();
        setEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong updating profile");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          <input type="file" name="profileImage" accept="image/*" className="hidden" onChange={handleChange} />
          <img src={profileImagePreview || "https://via.placeholder.com/150"} alt="Profile" className="w-32 h-32 rounded-full shadow-lg object-cover border-4 border-primary" />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {editing ? (
          <>
            <InputField name="firstName" value={profileForm.firstName} onChange={handleChange} />
            <InputField name="lastName" value={profileForm.lastName} onChange={handleChange} />
            <InputField name="email" value={profileForm.email} onChange={handleChange} />
            <InputField name="phoneNo" value={profileForm.phoneNo} onChange={handleChange} />
          </>
        ) : (
          <>
            <ViewField icon={<FaUser />} title="First Name" value={profile?.firstName} />
            <ViewField icon={<FaUser />} title="Last Name" value={profile?.lastName} />
            <ViewField icon={<FaEnvelope />} title="Email" value={profile?.email} />
            <ViewField icon={<FaPhoneAlt />} title="Phone No" value={profile?.phoneNo} />
          </>
        )}
      </div>

      <ActionButtons editing={editing} onEdit={() => setEditing(true)} onSave={updateProfile} onCancel={() => setEditing(false)} />
    </div>
  );
};

const LabSection = ({ lab, labForm, setLabForm, labImagePreview, setLabImagePreview, editing, setEditing, fetchData }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setLabImagePreview(URL.createObjectURL(files[0]));
      setLabForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setLabForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateLab = async () => {
    const formData = new FormData();
    
    // Add all form fields
    formData.append('name', labForm.name);
    formData.append('location', labForm.location);
    formData.append('address', labForm.address);
    formData.append('isActive', labForm.isActive);
    
    // Add image if it exists and is a File object
    if (labForm.profileImage instanceof File) {
      formData.append('profileImage', labForm.profileImage);
    }

    try {
      const res = await fetch("/api/labadmin/lab", {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Lab updated successfully!");
        fetchData();
        setEditing(false);
      } else {
        toast.error(data.message || "Failed to update lab");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong updating lab");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          <input type="file" name="profileImage" accept="image/*" className="hidden" onChange={handleChange} />
          <img src={labImagePreview || "https://via.placeholder.com/300x200"} alt="Lab" className="w-32 h-32 rounded-lg object-cover border-4 border-primary" />
        </label>
        <div className="flex items-center">
          {lab?.isActive ? <MdOutlineCheckCircle className="text-success" size={24} /> : <MdCancel className="text-error" size={24} />}
          <span className="ml-2 text.text-dark">{lab?.isActive ? "Active" : "Inactive"}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {editing ? (
          <>
            <InputField name="name" value={labForm.name} onChange={handleChange} />
            <InputField name="location" value={labForm.location} onChange={handleChange} />
            <InputField name="address" value={labForm.address} onChange={handleChange} />
          </>
        ) : (
          <>
            <ViewField icon={<FaFlask />} title="Lab Name" value={lab?.name} />
            <ViewField icon={<CiLocationOn />} title="Location" value={lab?.location} />
            <ViewField icon={<FaRegAddressCard />} title="Address" value={lab?.address} />
          </>
        )}
      </div>

      <ActionButtons editing={editing} onEdit={() => setEditing(true)} onSave={updateLab} onCancel={() => setEditing(false)} />
    </div>
  );
};

const ViewField = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 bg.gray.lighter rounded-md p-4">
    <div className="text-primary">{icon}</div>
    <div>
      <p className="text-xs text.text-light">{title}</p>
      <p className="text-lg font-semibold text.text-dark">{value || "-"}</p>
    </div>
  </div>
);

const InputField = ({ name, value, onChange }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2 border border.border.DEFAULT rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
  />
);

const ActionButtons = ({ editing, onEdit, onSave, onCancel }) => (
  <div className="mt-6 flex gap-4">
    {!editing ? (
      <button onClick={onEdit} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80">
        Edit
      </button>
    ) : (
      <>
        <button onClick={onSave} className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-primary/90">
          Save
        </button>
        <button onClick={onCancel} className="bg.gray.dark text-white px-6 py-2 rounded-md hover:bg.gray.DEFAULT">
          Cancel
        </button>
      </>
    )}
  </div>
);

export default LabAdminProfileSettings;