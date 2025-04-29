import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/allusers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.status === 403) {
          setError('You are not authorized to view this page. Admins only.');
          navigate('/unauthorized'); // Redirect if not admin
        } else {
          setError(err.response?.data?.message || 'Something went wrong.');
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id)); // Remove the deleted user from the list
      alert('User deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting user.');
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/update/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUserList = users.map((user) =>
        user._id === id ? response.data.user : user
      );
      setUsers(updatedUserList);
      setEditingUser(null);
      setUpdatedUser({
        name: '',
        email: '',
        role: '',
      });
      alert('User updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating user.');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">All Users</h1>

      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg mb-4">{error}</div>
      )}

      {users.length === 0 && !error && (
        <div className="text-gray-500">No users found.</div>
      )}

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="text-yellow-600 hover:text-yellow-800 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name || editingUser.name}
                onChange={handleEditChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email || editingUser.email}
                onChange={handleEditChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={updatedUser.role || editingUser.role}
                onChange={handleEditChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setEditingUser(null)}
                className="mr-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingUser._id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
