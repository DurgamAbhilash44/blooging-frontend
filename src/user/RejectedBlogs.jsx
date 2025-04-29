import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RejectedBlogs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedBlog, setEditedBlog] = useState({ title: '', content: '' });

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

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleEditClick = (blog) => {
    setEditMode(blog._id);
    setEditedBlog({ title: blog.title, content: blog.content });
  };

  const handleEditChange = (e) => {
    setEditedBlog({ ...editedBlog, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/update/${id}`,
        { ...editedBlog },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      const updated = response.data.blog;
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
      setEditMode(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Rejected Blogs</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-4">{error}</div>}
      {!loading && blogs.length === 0 && !error && (
        <p className="text-gray-500">No rejected blogs found.</p>
      )}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white shadow-md rounded-lg p-6 mb-4 border border-red-200"
        >
          {editMode === blog._id ? (
            <>
              <input
                type="text"
                name="title"
                value={editedBlog.title}
                onChange={handleEditChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <textarea
                name="content"
                value={editedBlog.content}
                onChange={handleEditChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditSubmit(blog._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-red-700">{blog.title}</h2>
              <p className="text-gray-700 mt-2">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-4">
                Author: {blog.author?.name || 'Unknown'} ({blog.author?.email || 'No email'})
              </p>
              <p className="text-sm text-red-600 font-semibold mt-1">Status: {blog.status}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RejectedBlogs;
