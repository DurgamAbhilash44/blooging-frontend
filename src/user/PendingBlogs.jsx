import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view blogs.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/getpending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(response.data.blogs);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBlogs();
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Pending Blogs</h1>

        {loading ? (
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            Loading...
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-md mb-4 text-center">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-600 text-center">No pending blogs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-purple-800">{blog.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
                <p
                  className={`text-sm font-medium mt-4 ${
                    blog.status === 'Pending'
                      ? 'text-yellow-600 bg-yellow-100'
                      : 'text-green-600 bg-green-100'
                  } px-3 py-1 rounded-full inline-block`}
                >
                  Status: {blog.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingBlogs;
