import React from "react";
import { Link, useParams } from "react-router-dom";

const PackageBooking = () => {
  const { title } = useParams(); 

  return (
    <div className="bg-white shadow-lg p-10 md:max-w-7xl mx-auto md:mt-28 mt-32 md:mb-12 mb-12 ">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Booking for {decodeURIComponent(title)}
      </h1>
      <p className="text-lg">
        Complete the form below to confirm your booking for{" "}
        <span className="font-bold">{decodeURIComponent(title)}</span>.
      </p>

      {/* Link to Cart with title */}
      <Link to={`/cart/package/${title}`} className="mt-6 inline-block bg-primary text-white py-2 px-4 rounded-lg">
        Proceed to Cart
      </Link>
    </div>
  );
};

export default PackageBooking;
