import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/AuthSlice";
import ProfileView from "./ProfileView";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    dispatch(updateUser());
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  pt-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile</h1>
        <ProfileView user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
