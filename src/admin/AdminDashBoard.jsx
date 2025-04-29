import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('role'); // Fetch role from localStorage
    const token = localStorage.getItem('token'); // Ensure token is available

    if (!token || !role) {
      navigate('/login'); // Redirect if not logged in or role is not available
      return;
    }

    if (role === 'admin') {
      setIsAdmin(true); // Allow access if role is 'admin'
    } else {
      navigate('/unauthorized'); // Redirect if role is not 'admin'
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null; // Return nothing if not admin

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Blog Management */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Blog Management</h2>
            <ul className="space-y-3">
              <li>
                <Link to='/allusers'>All Users</Link>
              </li>
              <li>
                <Link to="/admin-rejected" className="text-blue-600 hover:underline">
                  View Rejected Blogs
                </Link>
              </li>
              <li>
                <Link to="/admin-accepted" className="text-blue-600 hover:underline">
                  View Accepted Blogs
                </Link>
              </li>

              <li>
                <Link to="/admin-pending" className="text-blue-600 hover:underline">
                    View Pending Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* User Management */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Management</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/admin/users" className="text-blue-600 hover:underline">
                  View All Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
