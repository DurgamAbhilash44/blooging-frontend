import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RejectedAdminBlogs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRejectedBlogs();
  }, []);

  const fetchRejectedBlogs = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized. Please login.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/getrejected`, {
        headers: { Authorization: `Bearer ${token}` },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-center">
          Rejected Blogs
        </h1>

        {loading && (
          <div className="flex justify-center p-8">
            <div className="animate-pulse text-orange-500 font-medium text-lg">
              Loading rejected blogs...
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 shadow-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
        
        {!loading && blogs.length === 0 && !error && (
          <div className="text-center p-10 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-orange-600 font-medium text-lg">No rejected blogs found.</p>
          </div>
        )}

        <div className="grid gap-6 mt-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-400"
            >
              <h2 className="text-xl font-bold text-red-700 mb-3">{blog.title}</h2>
              <p className="text-gray-700 mt-3 bg-white/60 p-4 rounded-lg">{blog.content}</p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {blog.status}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  By: {blog.author?.name || 'Unknown'}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium truncate max-w-full">
                  {blog.author?.email || 'No email'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RejectedAdminBlogs;