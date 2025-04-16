import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusCard from "./OrderStatusCard";
import PaymentDetailsCard from "./PaymentDetailsCard";
import OrderInfoCard from "./OrderInfoCard";
import { PatientInfoCard, AddressInfoCard, PaymentInfoCard, LabDetailsCard } from "./PatientInfoCard";
import SampleCollectionCard from "./SampleCollectionCard";
import ReportCard from "./ReportCard";

const OrderEdit = () => {
  const { orderId } = useParams();
  
  // State for Order and Reports
  const [order, setOrder] = useState({
    id: orderId,
    booking: "Healthy 2023 Full Body Checkup",
    type: "Package",
    status: "Completed",
    paymentStatus: "Paid",
    patient: "Abdul Rehman",
    orderDate: "11/22/2023, 06:33 PM",
    price: "PKR 15,000.00",
    sampleType: "Lab",
    paymentId: "PAY123456",
    paymentMethod: "Cash",
    completionDate: "11/23/2023, 10:00 AM",
    user: {
      name: "Abdul Rehman",
      email: "abdul@example.com",
      phone: "123456789",
      address: "Street 123, City, Country",
    },
    lab: {
      name: "City Diagnostic Center",
      address: "123 Main Street, City, Country",
      contact: "987654321",
    },
  });

  const [reports, setReports] = useState([]);

  const statuses = [
    "In Review", "Update", "Pending", "Schedule", "Testing", "Completed", "Cancelled"
  ];

  const handleStatusChange = (status) => {
    setOrder((prev) => ({ ...prev, status }));
  };

  const handleUpdateOrder = () => {
    console.log("Updated Order:", order);
    console.log("Updated Reports:", reports);
    alert("Order updated successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen mt-12">
      <div className="flex-1 space-y-6">
        <OrderStatusCard 
          order={order}
          orderStatus={order.status} 
          statuses={statuses} 
          handleStatusChange={handleStatusChange} 
        />
        <PaymentDetailsCard order={order} />
        <SampleCollectionCard order={order} />
        <ReportCard reports={reports} setReports={setReports} />
        <OrderInfoCard order={order} />
        
        <button 
          className="w-full py-2 bg-primary text-white rounded  transition"
          onClick={handleUpdateOrder}
        >
          Update Order
        </button>
      </div>
      
      <div className="w-full md:w-1/3 space-y-6">
        <PatientInfoCard user={order.user} />
        <PaymentInfoCard order={order} />
        <AddressInfoCard address={order.user.address} />
        <LabDetailsCard lab={order.lab} />
      </div>
    </div>
  );
};

export default OrderEdit;
