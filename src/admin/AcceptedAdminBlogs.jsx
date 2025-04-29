import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcceptedBlogs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAcceptedBlogs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized. Please login.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/getaccepted`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong.');
      } else {
        setError('Server not responding.');
      }
    }
  };

  useEffect(() => {
    fetchAcceptedBlogs();
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-center">
          Accepted Blogs
        </h1>

        {loading && (
          <div className="flex justify-center p-8">
            <div className="animate-pulse text-purple-600 font-medium text-lg">
              Loading accepted blogs...
            </div>
          </div>
        )}

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-4 rounded-lg mb-6 shadow-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-lg mb-6 shadow-md">
            <p className="text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        {!loading && blogs.length === 0 && !error && (
          <div className="text-center p-10 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-600 font-medium text-lg">No accepted blogs found.</p>
          </div>
        )}

        <div className="grid gap-6 mt-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-400"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-3">{blog.title}</h2>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {blog.status}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  By: {blog.author?.name || 'Unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcceptedBlogs;