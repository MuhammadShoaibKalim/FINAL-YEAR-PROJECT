import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSpinner, FaStar, FaMapMarkerAlt, FaFlask, FaVials, FaBox, FaHeartbeat, FaUserAlt, FaChild, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/search/all?query=${query}`);
        setResults(response.data.data);
      } catch (error) {
        toast.error('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-gray-600 mb-6">
          Try different keywords or check your spelling
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {/* <button
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            onClick={() => {
              const input = document.querySelector('input[placeholder*="Search any test"], input[placeholder*="Search..."]');
              if (input) {
                input.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <FaSearch /> Back to Search
          </button> */}
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 bg-gray-100 text-primary rounded-lg hover:bg-gray-200 border border-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2v-5a2 2 0 00-2-2h-1m-10 0a2 2 0 00-2 2v5a2 2 0 002 2h1" /></svg>
            Home Page
          </a>
        </div>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'test':
        return <FaVials className="text-blue-500" />;
      case 'package':
        return <FaBox className="text-green-500" />;
      case 'lab':
        return <FaFlask className="text-purple-500" />;
      case 'health-concern':
        return <FaHeartbeat className="text-red-500" />;
      case 'most-used-test':
        return <FaUserAlt className="text-indigo-500" />;
      default:
        return <FaSearch className="text-gray-500" />;
    }
  };

  const healthConcernRoutes = {
    "heart health": "/heart-health",
    "diabetes care": "/diabetes-care",
    "women's health": "/women's-health",
    "men's health": "/men's-health",
    "senior care": "/senior-care",
    "child health": "/child-health",
  };

  const mostUsedTestRoutes = {
    "complete blood count (cbc)": "/most-used/cbc",
    "lipid profile": "/most-used/lipid-profile",
    "thyroid profile": "/most-used/thyroid-profile",
    "diabetes screening": "/most-used/diabetes-screening",
  };

  const staticPageRoutes = {
    "about us": "/about",
    "contact": "/contact",
    "join": "/join",
    "privacy policy": "/privacy-policy",
    "testimonials": "/testimonials",
    "features": "/features",
    "why us": "/why-us",
    "faq": "/faq",
    "symptom checker": "/symptoms",
    "partners": "/partners",
    "services": "/services",
    "home": "/",
  };

  const handleResultClick = (result) => {
    switch (result.type) {
      case 'test':
        navigate(`/labs/${result.lab}/testpackage?type=test&id=${result._id}`);
        break;
      case 'package':
        navigate(`/labs/${result.lab}/testpackage?type=package&id=${result._id}`);
        break;
      case 'lab':
        navigate(`/labs/${result._id}/details`);
        break;
      case 'health-concern': {
        const route = healthConcernRoutes[result.displayName.toLowerCase()];
        if (route) navigate(route);
        else if (result.path) navigate(result.path);
        break;
      }
      case 'most-used-test': {
        const route = mostUsedTestRoutes[result.displayName.toLowerCase()];
        if (route) navigate(route);
        else if (result.path) navigate(result.path);
        break;
      }
      case 'static-page': {
        const route = staticPageRoutes[result.displayName.toLowerCase()];
        if (route) navigate(route);
        else if (result.path) navigate(result.path);
        break;
      }
      default:
        break;
    }
  };

  const handleAddToCart = async (result) => {
    try {
      const res = await axios.post(
        '/api/cart/add',
        {
          testOrPackageId: result._id,
          type: result.type === 'package' ? 'Package' : 'Test',
          name: result.displayName,
          price: result.price,
          labId: result.lab,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      if (res.data.success) {
        toast.success('Added to cart!');
        navigate('/place-order');
      } else {
        toast.error(res.data.message || 'Failed to add to cart');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back to Home Button */}
      <button
        className="flex items-center text-primary hover:underline mb-6"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft className="mr-2" /> Back to Home
      </button>
      <h1 className="text-2xl font-semibold mb-2">
        Search Results for &quot;{query}&quot;
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleResultClick(result)}
          >
            <div className="flex items-center mb-2">
              {getIcon(result.type)}
              <span className="ml-2 text-sm font-medium text-gray-500 capitalize">
                {result.type.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{result.displayName}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {result.displayDescription}
            </p>
            {result.price && (
              <div className="text-blue-600 font-semibold">
                ₹{result.price}
              </div>
            )}
            {result.labName && (
              <div className="mt-2 text-sm text-gray-500">
                Lab: {result.labName}
              </div>
            )}
            {result.address && (
              <div className="mt-2 text-sm text-gray-500">
                {result.address}
              </div>
            )}
            {(result.type === 'test' || result.type === 'package') && result.lab && (
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                onClick={e => { e.stopPropagation(); handleAddToCart(result); }}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
