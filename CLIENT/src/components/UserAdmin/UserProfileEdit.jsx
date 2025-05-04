import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/AuthSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phoneNo: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNo: user.phoneNo || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("User not loaded.");
      return;
    }

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phoneNo", formData.phoneNo);
    if (file) data.append("image", file);

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/profile/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Profile updated successfully");
        dispatch(updateUser());
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update failed", err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Preview */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="rounded-full object-cover w-24 h-24 border" />
            ) : user?.image ? (
              <img src={user.image} alt="Profile" className="rounded-full object-cover w-24 h-24 border" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border">
                No Image
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading}
            className="text-sm"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First Name"
            className="border p-3 w-full rounded"
            disabled={loading}
          />
          <input
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last Name"
            className="border p-3 w-full rounded"
            disabled={loading}
          />
        </div>

        <input
          value={formData.phoneNo}
          onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
          placeholder="Phone Number"
          className="border p-3 w-full rounded"
          disabled={loading}
        />

        {loading ? (
          <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded" disabled>
            Updating...
          </button>
        ) : (
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
            Update Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
