import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const source = axios.CancelToken.source();
    
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          cancelToken: source.token,
        });
        setUser(response.data.user);
      } catch (err) {
        if (axios.isCancel(err)) return;
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'An error occurred.');
        }
      }
    };
    
    fetchUserProfile();
    return () => source.cancel('Component unmounted');
  }, [API_URL, navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-indigo-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          
          <nav>
            <ul className="space-y-2">
              <li className="p-3 rounded-lg bg-white bg-opacity-10">
                <a href="#" className="flex items-center text-white">
                  <span>📊</span>
                  <span className="ml-3">Profile</span>
                </a>
              </li>
              <li className="p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                <a href="#" className="flex items-center text-white">
                 <Link to="/create-blog">Create Blog</Link>
                </a>
              </li>

              <li className="p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                <a href="#" className="flex items-center text-white">
                 <Link to="/pending-blogs">Pending Blogs</Link>
                </a>
              </li>

              <li className="p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                <a href="#" className="flex items-center text-white">
                 <Link to="/rejected-blogs">Rejected Blogs</Link>
                </a>
              </li>

              <li className="p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                <a href="#" className="flex items-center text-white">
                 <Link to="/get-accepted">Accepted Blogs</Link>
                </a>
              </li>
              <li className="p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                <a href="#" className="flex items-center text-white">
                 <Link to="/all-users-blogs">All Users Blogs</Link>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 text-sm font-medium transition flex items-center justify-center"
          >
            <span className="mr-2">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          </div>
        </header>

        <main className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md">
              {error}
            </div>
          )}

          {/* Loading State */}
          {!user ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-500">Loading your profile...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-800 px-8 py-10 text-white">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-4xl font-bold">{user.name}</h2>
                    
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 text-lg">
                    Welcome to your profile dashboard! Here you can view your account details.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfileDashboard;