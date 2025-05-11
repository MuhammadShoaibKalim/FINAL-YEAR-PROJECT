import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSpinner, FaStar, FaMapMarkerAlt, FaFlask, FaVials, FaBox } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q');

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
        <p className="text-gray-600">
          Try different keywords or check your spelling
        </p>
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
      default:
        return <FaSearch className="text-gray-500" />;
    }
  };

  const handleResultClick = (result) => {
    switch (result.type) {
      case 'test':
        window.location.href = `/test/${result._id}`;
        break;
      case 'package':
        window.location.href = `/package/${result._id}`;
        break;
      case 'lab':
        window.location.href = `/lab/${result._id}`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
                {result.type}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
