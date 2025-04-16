import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Packages = () => {
    const packages = [
        {
          title: "Full Body Check-Up",
          tests: [
            "Complete Blood Count (CBC)",
            "Liver Function Test (LFT)",
            "Kidney Function Test (KFT)",
            "Blood Sugar Test",
            "Cholesterol Test",
          ],
          bookings: 250,
        },
        {
          title: "Heart Health Package",
          tests: [
            "ECG (Electrocardiogram)",
            "Cholesterol Test",
            "Blood Pressure Measurement",
            "Liver Function Test (LFT)",
          ],
          bookings: 180,
        },
        {
          title: "Women’s Health Package",
          tests: [
            "Pregnancy Test",
            "Thyroid Function Test (TFT)",
            "Vitamin D Test",
            "Complete Blood Count (CBC)",
            "Ultrasound",
          ],
          bookings: 150,
        },
        {
          title: "Diabetes Care Package",
          tests: [
            "Blood Sugar Test",
            "HbA1c Test",
            "Kidney Function Test (KFT)",
            "Cholesterol Test",
          ],
          bookings: 200,
        },
        {
          title: "Senior Citizen Health Package",
          tests: [
            "Bone Density Test",
            "Thyroid Function Test (TFT)",
            "Complete Blood Count (CBC)",
            "Vitamin B12 Test",
            "Urine Analysis",
          ],
          bookings: 170,
        },
        {
          title: "Sports Fitness Package",
          tests: [
            "Liver Function Test (LFT)",
            "Muscle Enzyme Test",
            "Cholesterol Test",
            "Complete Blood Count (CBC)",
            "Vitamin D Test",
          ],
          bookings: 120,
        },
      ];

    return (
        <div className="bg-white shadow py-10 px-4 md:px-20 lg:px-40 mt-2">
            <h1 className="text-2xl font-bold text-black mb-4">Frequently Booked Packages</h1>
            <p className="text-black mb-8">
                Choose from our carefully health packages designed for your
                well-being.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-2 flex flex-col items-center text-center"
                    >
                        <h3 className="text-lg font text-gray">Package</h3>
                           <div className="text-lg font-bold text-black">{pkg.title}</div>
                                <Link to="/services/test-packages" >
                                         <button className="flex items-center justify-center bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition mt-4">
                                            Book Now <AiOutlineArrowRight className="ml-2" />
                                         </button>
                                      </Link>
                           <div className="flex justify-center w-full mt-2">
                            <div className="flex items-center text-sm text-black mt-2 border-r border-gray-300 pr-4">
                                <FaEye className="text-black " />
                                <span className="font-bold ">{pkg.bookings}</span> Booked
                            </div>
                            <div className="flex items-center text-sm text-black mt-2">
                                <span className="font-bold">{pkg.tests.length}</span> Tests Included
                            </div>
                        </div>



                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
