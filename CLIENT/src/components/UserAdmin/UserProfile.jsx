import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <p className="text-gray-500 text-center py-10">Loading user profile...</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">My Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {user?.image ? (
            <img
              src={user.image}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-sm"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold border shadow-sm">
              No Image
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-medium text-gray-800">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-lg font-medium text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-lg font-medium text-gray-800">{user.phoneNo || "Not Provided"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">User Role</p>
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
