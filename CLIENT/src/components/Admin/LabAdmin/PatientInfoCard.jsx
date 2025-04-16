import React from "react";

const PatientInfoCard = ({ user }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Patient Information</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
};

const AddressInfoCard = ({ address }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Address</h3>
      <p>{address}</p>
    </div>
  );
};

const PaymentInfoCard = ({ order }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
      <p><strong>Price:</strong> {order.price}</p>
      <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
    </div>
  );
};

const LabDetailsCard = ({ lab }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Lab Details</h3>
      <p><strong>Lab Name:</strong> {lab.name}</p>
      <p><strong>Lab Address:</strong> {lab.address}</p>
      <p><strong>Lab Contact:</strong> {lab.contact}</p>
    </div>
  );
};

export { PatientInfoCard, AddressInfoCard, PaymentInfoCard, LabDetailsCard };
