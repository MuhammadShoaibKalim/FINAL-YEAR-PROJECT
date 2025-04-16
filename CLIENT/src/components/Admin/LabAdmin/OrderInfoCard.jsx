import React from "react";

const OrderInfoCard = ({ order }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h3 className="text-2xl font-semibold">Order Information</h3>
      <div className="p-5 space-y-3 text-black">
        <div className="flex justify-between">
          <span className="font-semibold">Order ID:</span>
          <span className="text-gray-600">{order.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Order Date:</span>
          <span className="text-gray-600">{order.orderDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Payment Method:</span>
          <span className="text-gray-600">{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Completion Date:</span>
          <span className="text-gray-600">{order.completionDate}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCard;
