import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NODE_URL = import.meta.env.VITE_API_URL;

const PendingAdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
          navigate('/unauthorized');
          return;
        }

        const response = await axios.get(`${NODE_URL}/api/getpending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(response.data.blogs);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBlogs();
  }, [navigate]);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${NODE_URL}/api/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove accepted blog from the list
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to accept blog');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${NODE_URL}/api/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove rejected blog from the list
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject blog');
    }
  };

  if (loading) return <p>Loading pending blogs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 rounded-md mb-3 shadow">
          <h3 className="text-lg font-bold">{blog.title}</h3>
          <p className="text-gray-700">{blog.content}</p>
          <p className="text-sm text-gray-500 mt-2">Author: {blog.author.name}</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleAccept(blog._id)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(blog._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingAdminBlogs;
