import React from "react";

const PaymentDetailsCard = ({ order }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h3 className="text-2xl font-semibold mb-5 text-gray-800">Payment Details</h3>

      {/* Payment Status Card */}
      <div className="bg-gradient-to-r from-primary to-white text-white shadow-lg p-5 rounded-xl">
        <p className="text-lg font-semibold flex justify-between">
          <span>Payment Status</span>
          <span className="bg-white text-primary px-3 py-1 rounded-lg text-sm shadow-md">
            {order.paymentStatus}
          </span>
        </p>
      </div>

      {/* Payment Breakdown */}
      <div className="mt-4 p-5 bg-gray-100 rounded-xl shadow-sm">
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Subtotal:</span> <span>{order.price}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-lg mt-2">
          <span>Discount:</span> <span className="text-red-500 font-semibold">None</span>
        </div>
        <hr className="my-3 border-gray" />
        <div className="flex justify-between text-xl font-bold text-gray">
          <span>Total:</span> <span>{order.price}</span>
        </div>
      </div>

      {/* Update Button */}
      <button className="mt-6 w-full bg-primary text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md">
        Update Payment Status
      </button>
    </div>
  );
};

export default PaymentDetailsCard;
