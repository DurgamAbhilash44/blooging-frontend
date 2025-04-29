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

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized. Please login.');
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('Blog deleted successfully.');
      setBlogs(blogs.filter((blog) => blog._id !== blogId)); // remove deleted blog from state
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Failed to delete blog.');
      } else {
        setError('Server not responding.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Accepted Blogs</h1>

      {loading && (
        <div className="text-green-500 font-medium">Loading accepted blogs...</div>
      )}

      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-4">{error}</div>
      )}

      {successMessage && (
        <div className="text-green-700 bg-green-100 p-4 rounded-lg mb-4">
          {successMessage}
        </div>
      )}

      {!loading && blogs.length === 0 && !error && (
        <div className="text-gray-500">No accepted blogs found.</div>
      )}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white shadow-md rounded-lg p-6 mb-4 border border-green-200"
        >
          <h2 className="text-xl font-semibold text-green-700">{blog.title}</h2>
          <p className="text-sm text-gray-500 mt-4">Status: {blog.status}</p>

          <button
            onClick={() => handleDelete(blog._id)}
            className="mt-4 text-sm bg-red-100 text-red-700 hover:bg-red-200 px-4 py-1 rounded-lg"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AcceptedBlogs;
