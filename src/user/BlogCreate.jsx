import React, { useState } from 'react';
import axios from 'axios';

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${API_URL}/api/create`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Blog submitted successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error submitting blog.'
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Blog</h2>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Content</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg h-40 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogCreate;
