import React from "react";

const ProfileView = ({ user }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Personal Details</h2>
      {user?.image && (
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      )}
      <p>
        <strong>Name:</strong> {user?.firstName} {user?.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Phone:</strong> {user?.phoneNo || "N/A"}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </div>
  );
};

export default ProfileView;
