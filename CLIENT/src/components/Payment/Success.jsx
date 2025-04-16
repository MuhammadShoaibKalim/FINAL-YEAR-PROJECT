import { Link } from "react-router-dom";

const Success = () => {
    return (
      <div className="p-6 mt-32 max-w-6xl mx-auto text-center">
        <h2>Payment Successful 🎉</h2>
        <p>Thank you for your payment!</p>
        {/* Go to Home Page */}
        <Link to="/">
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
            Go to Home
          </button>
          </Link>
      </div>
    );
  };
  
  export default Success;
  