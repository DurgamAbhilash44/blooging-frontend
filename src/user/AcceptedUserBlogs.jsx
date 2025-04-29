import { useEffect, useState } from "react";
import axios from "axios";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"; // Empty heart 🤍
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";     // Filled heart ❤️

const AcceptedUserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;


  const token = localStorage.getItem("token"); // JWT token assumed

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/getaccepted`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleLike = async (blogId) => {
    try {
      const res = await axios.post(`${API_URL}/api/like/${blogId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedBlogs = blogs.map(blog =>
        blog._id === blogId ? res.data.blog : blog
      );
      setBlogs(updatedBlogs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (blogId) => {
    const comment = commentInputs[blogId];
    if (!comment) return;

    try {
      const res = await axios.post(`${API_URL}/api/comment/${blogId}`, { comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedBlogs = blogs.map(blog =>
        blog._id === blogId ? res.data.blog : blog
      );
      setBlogs(updatedBlogs);
      setCommentInputs({ ...commentInputs, [blogId]: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Accepted Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="border rounded-lg p-5 shadow-md space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="mt-2 text-gray-700">{blog.content}</p>
            </div>

            {/* Like button with heart icon */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLike(blog._id)}
                className="flex items-center gap-1 text-pink-500"
              >
                {blog.likes && blog.likes.some(like => like.user === JSON.parse(atob(token.split('.')[1])).id) ? (
                  <HeartSolid className="h-6 w-6" />
                ) : (
                  <HeartOutline className="h-6 w-6" />
                )}
                <span>{blog.likes?.length || 0}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Comments:</h3>
              {blog.comments?.length > 0 ? (
                blog.comments.map((c, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">• {c.comment}</p>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No comments yet.</p>
              )}
            </div>

            {/* Add Comment */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInputs[blog._id] || ""}
                onChange={(e) =>
                  setCommentInputs({ ...commentInputs, [blog._id]: e.target.value })
                }
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={() => handleComment(blog._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Comment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AcceptedUserBlogs;