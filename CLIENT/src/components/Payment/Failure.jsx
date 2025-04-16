import { Link } from "react-router-dom";

const Failure = () => {
    return (
      <div className="p-6 mt-32 max-w-6xl mx-auto text-center">
      <h2>Payment Failed ❌</h2>
        <p>Something went wrong. Please try again.</p>
        {/* Go to where */}
        <Link to="/cart">
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
           Check the issue
          </button>
          </Link>
      </div>
    );
  };
  
  export default Failure;
  