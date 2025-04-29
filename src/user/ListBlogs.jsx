import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/getallblogs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBlogs(response.data.blogs);
      } catch (err) {
        setError('Error fetching blogs: ' + err.message);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center" role="alert">
        ⚠️ {error}
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-center p-8 text-gray-500 text-lg">
        📭 No blogs available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-center mb-8">
        Latest Blog Posts
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <article 
            key={blog._id}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {blog.title}
              </h2>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-600">
                  Author: {blog.author.name}
                </span>
              </div>
            </div>
            
            <div className="p-6 text-gray-700 leading-relaxed">
              <p className="line-clamp-3">
                {blog.content}
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                Read More →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListBlogs;