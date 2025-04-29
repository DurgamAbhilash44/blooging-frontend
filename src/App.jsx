import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './user/Home';
import Signup from './user/Signup';
import Login from './user/Login';
import About from './user/About';
import Navbar from './user/Navbar';
import Profile from './user/Profile';


import BlogCreate from './user/BlogCreate';
import PendingBlogs from './user/PendingBlogs';
import RejectedBlogs from './user/RejectedBlogs';
import AcceptedBlogs from './user/AcceptedBlogs';
import AdminDashBoard from './admin/AdminDashBoard';
import AllUsers from './admin/AllUsers';
import RejectedAdminBlogs from './admin/RejectedAdminBlogs';
import AcceptedAdminBlogs from './admin/AcceptedAdminBlogs';
import PendingAdminBlogs from './admin/PendingAdminBlogs';
import AcceptedUserBlogs from './user/AcceptedUserBlogs';
import ListBlogs from './user/ListBlogs';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  return (
    <BrowserRouter>
      {/* Conditionally render Navbar */}
      {!isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

    
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-blog" element={<BlogCreate/>} />
        
          <Route path="/pending-blogs" element={<PendingBlogs />} />
          <Route path="/rejected-blogs" element={<RejectedBlogs/>} />
          <Route path="/get-accepted" element={<AcceptedBlogs />} />
          <Route path="/all-users-accepted" element={<AcceptedUserBlogs />} />
          <Route path="/all-users-blogs" element={<ListBlogs />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/admin-rejected" element={<RejectedAdminBlogs />} />
          <Route path="/admin-accepted" element={<AcceptedAdminBlogs />} />
          <Route path="/admin-pending" element={<PendingAdminBlogs />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
